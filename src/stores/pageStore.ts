import { create } from "zustand";

interface PageStoreState {
  basketIsOpen: boolean;
  loader: boolean;
  setLoading: (payload: boolean) => void;
  setBasketIsOpen: (payload: boolean) => void;
}

export const usePageStore = create<PageStoreState>((set) => ({
  basketIsOpen: false,
  loader: false,
  setLoading: (payload: boolean) => {
    set(() => ({ loader: payload }));
  },
  setBasketIsOpen: (payload: boolean) => {
    set(() => ({ basketIsOpen: payload }));
  },
}));
