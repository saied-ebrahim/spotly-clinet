import { create } from "zustand";

interface LoaderStore {
  apiCount: number;
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

export const useLoaderStore = create<LoaderStore>((set) => ({
  apiCount: 0,
  isLoading: false,
  startLoading: () =>
    set((state) => ({
      apiCount: state.apiCount + 1,
      isLoading: true,
    })),
  stopLoading: () =>
    set((state) => {
      const newCount = state.apiCount > 0 ? state.apiCount - 1 : 0;
      return {
        apiCount: newCount,
        isLoading: newCount > 0,
      };
    }),
}));
