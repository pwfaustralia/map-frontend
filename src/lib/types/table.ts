import { ReactNode } from 'react';

export type TableFilterModifier =
  | 'equals'
  | 'contains'
  | 'not equals'
  | 'starts with'
  | 'date equals'
  | 'select'
  | 'multiselect';

export type TableFilterOptions = Array<{ label: string; value: string }>;

export interface TableFilterContext {
  filters: TableFilter[];
  filter: TableFilter | undefined;
  // TO DO: add type for selectedModifier
  selectedModifier: any;
  setValue: (value: any) => TableFilterContext;
  toggleActive: (isActive: boolean) => TableFilterContext;
  setModifier: (modifier: TableFilterModifier) => TableFilterContext;
  setOptions: (options: TableFilterOptions) => TableFilterContext;
}

export interface TableFilterModifierOption {
  modifier: TableFilterModifier;
  appendSearchText?: string | boolean;
  appendQueryBy?: boolean;
  appendFilterBy?: boolean;
  infix?: 'always' | 'off' | 'fallback';
  valueTransformer?: (id: string, value: any) => string;
  modifierInputComponent: (filter: TableFilter, context: TableFilterContext) => ReactNode;
}

export interface TableFilter {
  id: string;
  label: string;
  modifier: TableFilterModifier;
  excludeModifiers?: TableFilterModifier[];
  options?: Array<{ label: string; value: string }>;
  modifierOptions?: TableFilterModifierOption[];
  active?: boolean;
  hidden?: boolean;
  value?: any;
  formattedValue?: any;
}

export interface TableFilterConfig {
  defaultValue?: TableFilter[];
  modifierOptions: TableFilterModifierOption[];
}
