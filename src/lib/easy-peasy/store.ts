import { action, computed, createStore, persist } from "easy-peasy";
import StoreModel from "./models";

export const store = createStore<StoreModel>(
  persist(
    {
      user: {
        userData: null,
        isLoggedIn: computed((state) => state.userData != null),
        logout: action((state) => {
          state.userData = null;
        }),
        setUserData: action((state, payload) => {
          if (payload.token) {
            delete payload.token;
          }
          state.userData = payload;
        }),
        userPermissions: computed((state) => (state.userData ? state.userData.user_role.role_permissions : [])),
      },
    },
    {
      storage: "localStorage",
    }
  ),
  {
    name: "Global store",
    version: 0.1,
    devTools: !process.env.NODE_ENV || process.env.NODE_ENV === "development",
  }
);
