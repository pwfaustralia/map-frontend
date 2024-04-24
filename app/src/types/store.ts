import { Action, Computed } from "easy-peasy";
import { PageTemplate, PageTemplateKeys, PageTemplates } from "../components/templates/dashboard/default/types";
import User from "./user";

export interface UserModel {
  userData: User | null;
  isLoggedIn: Computed<UserModel, boolean>;
  logout: Action<UserModel, boolean>;
  setUserData: Action<UserModel, User>;
  userPermissions: Computed<UserModel, string[] | []>;
}

export interface PageTemplateModel extends PageTemplate {
  setTemplatePart?: Action<
    PageTemplateModel,
    {
      templateName: PageTemplateKeys;
      parts: PageTemplates;
    }
  >;
}

export default interface StoreModel {
  user: UserModel;
  page: PageTemplateModel;
}
