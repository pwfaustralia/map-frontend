export type TableFilterModifiers = 'equals' | 'contains' | "doesn't contain" | 'starts with';

export interface TableFilter {
  id: string;
  label: string;
  modifier: TableFilterModifiers;
  modifierOptions?: TableFilterModifiers[];
  active?: boolean;
  value?: any;
  formatted_value?: any;
  lastActiveDate?: Date;
}

export interface TableFilterConfig {
  defaultValue?: TableFilter[];
}
