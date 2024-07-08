import { useStoreState } from "easy-peasy";
import StoreModel from "../types/store";
import { useMemo } from "react";

function useUserRole() {
  const {
    userData: { user_role },
  } = useStoreState<StoreModel>((states) => states.user);

  const checkUserRole = useMemo(
    () => ({
      isAdminOrStaff: user_role.id === "1" || user_role.id === "2" || user_role.id === "3",
      isSuperAdmin: user_role.id === "1",
      isStaff: user_role.id === "2",
      isAdmin: user_role.id === "3",
      isClient: user_role.id === "4",
      role: user_role,
    }),
    [user_role]
  );

  return checkUserRole;
}

export default useUserRole;
