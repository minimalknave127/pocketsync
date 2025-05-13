import { tServiceOption } from "@/ts/services";
import { create } from "zustand";

export type tServStoreOption = Omit<tServiceOption, "created_at" | "id"> &
  Partial<Pick<tServiceOption, "id">>;

export interface tServiceStore {
  options: tServStoreOption[];
  updateOptions: (options: tServStoreOption[]) => void;
}

export const useServiceStore = create<tServiceStore>((set) => ({
  options: [],
  updateOptions: (options: tServStoreOption[]) => set({ options }),
}));
