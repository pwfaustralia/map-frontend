export interface LayoutStore {
  hydrated: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export interface ClientStore {
  isEditingProfile: boolean;
  toggleEditingProfile: (open: boolean) => void;
}
