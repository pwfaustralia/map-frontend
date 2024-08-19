import { useState } from 'react';

import { TableFilter, TableFilterConfig, TableFilterModifiers } from '../types';

export default function useTableFilter(config: TableFilterConfig) {
  const modifierOptions: TableFilterModifiers[] = ['equals', 'contains', "doesn't contain", 'starts with'];
  const { defaultValue = [] } = config;
  const [filters, setFilters] = useState<TableFilter[]>(
    defaultValue.map((filter) => ({
      ...filter,
      active: typeof filter.active === 'boolean' ? filter.active : false,
      modifierOptions: filter.modifierOptions || modifierOptions,
    }))
  );

  const getAndUpdate = (_id: string, updater: (filter: TableFilter) => TableFilter, _value?: TableFilter[]) => {
    let _filters = [...(_value || filters)];
    let index = _filters.findIndex(({ id }) => id === _id);
    _filters[index] = updater(_filters[index]);
    if (index < 0) throw `Invalid filter id ${_id}`;
    if (_filters[index].active) {
      _filters[index].lastActiveDate = new Date();
    }
    setFilters(_filters);
    return getThis(_id, _filters);
  };

  const getThis = (_id: string, _value: TableFilter[] = filters) => ({
    setValue: (value: string) =>
      getAndUpdate(
        _id,
        (filter: TableFilter) => ({
          ...filter,
          value,
        }),
        _value
      ),
    formatValue: (updater: (value: any) => any) =>
      getAndUpdate(
        _id,
        (filter: TableFilter) => ({
          ...filter,
          formatted_value: updater(filter.value),
        }),
        _value
      ),
    toggleActive: (isActive?: boolean) =>
      getAndUpdate(
        _id,
        (filter) => ({
          ...filter,
          active: typeof isActive === 'boolean' ? isActive : !filter?.active,
        }),
        _value
      ),
    setModifier: (value: TableFilterModifiers) =>
      getAndUpdate(
        _id,
        (filter) => ({
          ...filter,
          modifier: value,
        }),
        _value
      ),
  });

  const getFilter = (_id: string) => {
    return getThis(_id);
  };

  return { filters, getFilter };
}
