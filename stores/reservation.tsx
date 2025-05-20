import { tNewReservation } from "@/ts/reservation";
import { create } from "zustand";

interface tReservationCreateStore {
  reservation: Partial<tNewReservation> | null;
  setReservation: (reservation: Partial<tNewReservation>) => void;
  clearReservation: () => void;
}

export const useReservationCreateStore = create<tReservationCreateStore>(
  (set) => ({
    reservation: {
      repeat_count: 1,
      repeat_interval: "none",
      check_overlapping: false,
    },
    setReservation: (reservation) => set({ reservation }),
    clearReservation: () => set({ reservation: null }),
  })
);
