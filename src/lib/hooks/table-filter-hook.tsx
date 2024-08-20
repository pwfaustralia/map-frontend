import { useCallback, useState } from 'react';

import { TableFilter, TableFilterConfig, TableFilterContext, TableFilterModifier } from '../types';
import { MultiSearchRequestSchema } from 'typesense/lib/Typesense/MultiSearch';

export default function useTableFilter(config: TableFilterConfig) {
  const { defaultValue = [], modifierOptions } = config;
  const defaultConfig = defaultValue.map((filter) => ({
    ...filter,
    active: typeof filter.active === 'boolean' ? filter.active : false,
    modifierOptions: filter.modifierOptions || modifierOptions,
  }));
  const [filters, setFilters] = useState<TableFilter[]>(defaultConfig);
  const [staleFilters, setStaleFilters] = useState<TableFilter[]>([]);

  const getAndUpdate = (
    _id: string,
    updater: (filter: TableFilter) => TableFilter,
    _value?: TableFilter[],
    callback?: (context: TableFilterContext) => any
  ) => {
    let _filters = [...(_value || filters)];
    let index = _filters.findIndex(({ id }) => id === _id);
    _filters[index] = updater(_filters[index]);
    if (index < 0) throw `Invalid filter id ${_id}`;
    const context = getThis(_id, _filters);
    setFilters(_filters);
    if (callback) {
      callback(context);
    }
    return context;
  };

  const getOriginalFilter = (_id: string, _latestFilters: TableFilter[] = filters) => {
    return _latestFilters.find((filter) => filter.id === _id);
  };

  const getSelectedModifier = (_id: string, _latestFilters: TableFilter[] = filters) => {
    let originalFilter = getOriginalFilter(_id, _latestFilters);
    if (!originalFilter) return;
    let modifier = originalFilter?.modifier;
    let mod = modifierOptions.find((mod) => mod.modifier === modifier);
    return {
      ...mod,
      renderComponent: () => mod?.modifierInputComponent(originalFilter, getThis(_id)),
    };
  };

  const getThis = (_id: string, _value: TableFilter[] = filters): TableFilterContext => {
    let selectedModifier = _value ? getSelectedModifier(_id, _value) : getSelectedModifier(_id);
    let currentFilter = _value ? getOriginalFilter(_id, _value) : getOriginalFilter(_id);

    return {
      filters: _value,
      filter: currentFilter,
      selectedModifier: selectedModifier,
      setValue: (value: string) => {
        let formattedValue = selectedModifier?.valueTransformer?.(_id, value);
        return getAndUpdate(
          _id,
          (filter: TableFilter) => ({
            ...filter,
            value,
            ...(value ? { formattedValue } : { formattedValue: '' }),
          }),
          _value
        );
      },
      toggleActive: (isActive?: boolean) =>
        getAndUpdate(
          _id,
          (filter) => ({
            ...filter,
            active: typeof isActive === 'boolean' ? isActive : !filter?.active,
          }),
          _value
        ),
      setModifier: (value: TableFilterModifier) =>
        getAndUpdate(
          _id,
          (filter) => ({
            ...filter,
            modifier: value,
          }),
          _value,
          (context) => {
            context.setValue(context.filter?.value);
          }
        ),
    };
  };

  const getTypesenseSearchParams = () => {
    const searchParams: MultiSearchRequestSchema = {};
    const stagedParams: any = {
      q: [],
      filterBy: [],
      queryBy: [],
      infix: [],
    };
    const _filters = filters.filter(({ value, active }) => !!value && active);
    _filters.forEach(({ id, formattedValue, value }) => {
      const mod = getSelectedModifier(id);

      stagedParams.filterBy.push(formattedValue);
      if (typeof mod?.appendFilterBy === 'boolean' && !mod.appendFilterBy) {
        stagedParams.filterBy.pop();
      }
      if (mod?.appendSearchText) {
        if (typeof mod?.appendSearchText === 'string') {
          stagedParams.q.push(`${mod.appendSearchText}${value}`);
        } else {
          stagedParams.q.push(value);
        }
      }
      if (mod?.appendQueryBy) {
        stagedParams.queryBy.push(id);
        stagedParams.infix.push('off');
        if (mod?.infix) {
          stagedParams.infix[stagedParams.infix.length - 1] = 'always';
        }
      }
    });
    if (!stagedParams.q.length) {
      searchParams.q = '*';
    } else {
      searchParams.q = stagedParams.q.join(' ');
    }
    searchParams.filter_by = stagedParams.filterBy.join(' && ');
    searchParams.infix = stagedParams.infix.join(',');
    if (stagedParams.queryBy.length) searchParams.query_by = stagedParams.queryBy.join(',');
    setStaleFilters(filters);
    return searchParams;
  };

  const resetFilters = useCallback(() => {
    searchFilter('');
    setFilters(defaultConfig);
  }, []);

  const searchFilter = (_label: string) => {
    setFilters(
      filters.map((filter) => ({
        ...filter,
        hidden: filter.label.toLowerCase().trim().indexOf(_label.toLowerCase().trim()) < 0 && !filter.active,
      }))
    );
  };

  const getFilter = (_id: string) => {
    return getThis(_id);
  };

  return { filters, getFilter, getTypesenseSearchParams, resetFilters, staleFilters, searchFilter };
}
