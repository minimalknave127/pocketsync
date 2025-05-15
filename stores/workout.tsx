import { tWorkoutStep } from "@/ts/workouts";
import { create } from "zustand";

export type tWorkoutStepStoreOption = Omit<
  tWorkoutStep,
  "created_at" | "id" | "workout_id"
> &
  Partial<Pick<tWorkoutStep, "id">>;

export interface tWorkoutStore {
  steps: tWorkoutStepStoreOption[];
  updateSteps: (steps: tWorkoutStepStoreOption[]) => void;
}

export const useWorkoutStore = create<tWorkoutStore>((set) => ({
  steps: [],
  updateSteps: (steps: tWorkoutStepStoreOption[]) => set({ steps }),
}));
