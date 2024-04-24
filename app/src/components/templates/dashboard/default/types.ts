interface PageTemplatePart<T extends string> {
  parts?: Partial<Record<T, JSX.Element>>;
}

export type DashboardTemplatePartKeys = "toolbar-search" | "toolbar-avatar";

export interface DashboardTemplate extends PageTemplatePart<DashboardTemplatePartKeys> {}
export interface TestTemplate extends PageTemplatePart<DashboardTemplatePartKeys> {}

export type PageTemplates = DashboardTemplate | TestTemplate;

export enum PageTemplateKeys {
  "DASHBOARD" = "dashboard-template",
}

export interface PageTemplate {
  [PageTemplateKeys.DASHBOARD]?: DashboardTemplate;
}
