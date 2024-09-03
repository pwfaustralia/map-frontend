import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  TableFilterConfig,
  TableFilterContext,
  TableFilterModifier,
  TableFilterModifierOption,
} from '@/lib/types/table';
import { cn, formatDate } from '@/lib/utils';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';

export const YODLEE_DATE_FORMAT = 'YYYY-MM-DD';

export const transactionTableFilter = (
  yodlee: any,
  { isOpenDatePicker, setIsOpenDatePicker }: any
): TableFilterConfig => {
  return {
    defaultValue: [
      {
        id: 'keyword',
        label: 'Search Keyword',
        excludeModifiers: ['date equals', 'select', 'multiselect'],
        modifier: 'contains',
      },
      {
        id: 'categoryId',
        label: 'Category',
        modifier: 'multiselect',
        excludeModifiers: ['date equals', 'contains'],
        options:
          yodlee?.categoryData?.transactionCategory?.map((category: any) => ({
            value: category.id,
            label: category.category,
          })) || [],
      },
      {
        id: 'baseType',
        label: 'Base Type',
        modifier: 'select',
        excludeModifiers: ['date equals', 'contains', 'multiselect'],
        options: [
          {
            value: 'DEBIT',
            label: 'Debit',
          },
          {
            value: 'CREDIT',
            label: 'Credit',
          },
        ],
        value: 'DEBIT',
        formattedValue: 'DEBIT',
      },
      {
        id: 'container',
        label: 'Container',
        modifier: 'select',
        excludeModifiers: ['date equals', 'contains', 'multiselect'],
        options: [
          {
            value: 'bank',
            label: 'Bank',
          },
          {
            value: 'creditCard',
            label: 'Credit Card',
          },
          {
            value: 'investment',
            label: 'Investment',
          },
          {
            value: 'insurance',
            label: 'Insurance',
          },
          {
            value: 'loan',
            label: 'Loan',
          },
        ],
        value: 'bank',
        formattedValue: 'bank',
      },
      {
        id: 'fromDate',
        label: 'From Date',
        modifier: 'date equals',
        value: yodlee.initialModuleConfig?.transactions?.fromDate,
        formattedValue: formatDate(dayjs(yodlee.initialModuleConfig?.transactions?.fromDate), YODLEE_DATE_FORMAT),
        excludeModifiers: ['equals', 'contains', 'select', 'multiselect'],
      },
      {
        id: 'toDate',
        label: 'To Date',
        modifier: 'date equals',
        value: yodlee.initialModuleConfig?.transactions?.toDate,
        formattedValue: formatDate(dayjs(yodlee.initialModuleConfig?.transactions?.toDate), YODLEE_DATE_FORMAT),
        excludeModifiers: ['equals', 'contains', 'select', 'multiselect'],
      },
    ],
    modifierOptions: [
      {
        modifier: 'contains',
        valueTransformer: (id, value) => encodeURIComponent(value),
        modifierInputComponent: (filter, context: TableFilterContext) => (
          <Input
            defaultValue={filter.value}
            type="text"
            placeholder={filter.label}
            onChange={(e) => {
              if (context.filter?.id) context.setValue(e.target.value);
            }}
          />
        ),
      },
      {
        modifier: 'multiselect',
        valueTransformer: (id, value) => value.map(({ value }: any) => value).join(','),
        modifierInputComponent: (filter, context: TableFilterContext) => (
          <MultiSelect
            options={filter.options || []}
            selected={context.filter?.value || []}
            onChange={(selected) => {
              context.setValue(selected);
            }}
          />
        ),
      },
      {
        modifier: 'select',
        valueTransformer: (id, value) => value,
        modifierInputComponent: (filter, context: TableFilterContext) => (
          <Select
            onValueChange={(value: TableFilterModifier) => {
              if (context.filter?.id) context.setValue(value);
            }}
            value={filter.value}
          >
            <SelectTrigger variant="ghost" className="w-full text-left">
              <SelectValue placeholder="-" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Options</SelectLabel>
                {filter.options?.map(({ label, value }) => (
                  <SelectItem value={value} key={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ),
      },
      {
        modifier: 'date equals',
        valueTransformer: (id, value) => formatDate(dayjs(value), YODLEE_DATE_FORMAT),
        modifierInputComponent: (filter, context: TableFilterContext) => {
          const date = dayjs(filter.value || new Date()).toDate();
          return (
            <Popover
              open={isOpenDatePicker[filter.id as keyof typeof isOpenDatePicker]}
              onOpenChange={(open) => {
                setIsOpenDatePicker({
                  ...isOpenDatePicker,
                  [filter.id]: open,
                });
              }}
            >
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn('w-[280px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? formatDate(dayjs(date), YODLEE_DATE_FORMAT) : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Select
                  onValueChange={(value) => {
                    const days = parseInt(value);
                    context.setValue(dayjs().add(days, 'days').toString());
                    setIsOpenDatePicker({
                      ...isOpenDatePicker,
                      [filter.id]: false,
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="-30">Last Month</SelectItem>
                    <SelectItem value="-366">Last Year</SelectItem>
                    <SelectItem value="0">Today</SelectItem>
                  </SelectContent>
                </Select>
                <div className="rounded-md border">
                  <Calendar
                    captionLayout="dropdown-buttons"
                    mode="single"
                    fromYear={2000}
                    toYear={dayjs().get('y')}
                    selected={date}
                    defaultMonth={date}
                    onSelect={(day) => {
                      day && context.setValue(day?.toString());
                      setIsOpenDatePicker({
                        ...isOpenDatePicker,
                        [filter.id]: false,
                      });
                    }}
                  />
                </div>
              </PopoverContent>
            </Popover>
          );
        },
      },
    ],
  };
};

export const renderTransactionTableFilter = ({ filters, getFilter }: any) =>
  filters.map(({ id, active, label, modifier, modifierOptions, excludeModifiers, hidden }: any) => (
    <div key={id} className={clsx('flex flex-col gap-3 select-none', { hidden })}>
      <div className="flex items-center gap-2">
        <Checkbox
          checked={active}
          onCheckedChange={(checked: boolean) => {
            getFilter(id).toggleActive(checked);
          }}
          id={id + '_' + modifier}
        />
        <label htmlFor={id + '_' + modifier} className="text-md cursor-pointer">
          {label}
        </label>
      </div>
      {active && (
        <div className="flex flex-col gap-3 pl-5">
          <div>
            <Select
              onValueChange={(value: TableFilterModifier) => {
                getFilter(id).setModifier(value);
              }}
              value={modifier}
            >
              <SelectTrigger variant="ghost" className="w-auto text-left">
                <SelectValue placeholder="Select Modifier" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Modifier</SelectLabel>
                  {modifierOptions
                    ?.filter((m: TableFilterModifierOption) => !excludeModifiers?.includes(m.modifier))
                    .map(({ modifier }: any) => (
                      <SelectItem key={modifier} value={modifier} className="capitalize">
                        {modifier}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full">{getFilter(id).selectedModifier?.renderComponent()}</div>
        </div>
      )}
    </div>
  ));
