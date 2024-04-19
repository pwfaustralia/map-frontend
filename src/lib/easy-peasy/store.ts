import { action, computed, createStore, persist } from "easy-peasy";
import StoreModel from "../../types/store";

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
          state.userData = payload;
        }),
        userPermissions: computed(
          (state) => state?.userData?.user_role?.role_permissions.map((q) => q.scope_name) || []
        ),
      },
    },
    {
      storage: "localStorage",
    }
  ),
  {
    name: "Global store",
    version: 0.2,
    devTools: !process.env.NODE_ENV || process.env.NODE_ENV === "development",
  }
);
