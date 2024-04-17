import { action, computed, createStore, persist } from "easy-peasy";
import StoreModel from "./models";

export const userStorage = createStore<StoreModel>(
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
      },
    },
    {
      storage: "localStorage",
    }
  ),
  {
    name: "User storage",
    version: 0.1,
    devTools: !process.env.NODE_ENV || process.env.NODE_ENV === "development",
  }
);
