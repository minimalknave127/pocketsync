// import { LanguagesTypes } from "@/ts/global";

import { tWorkoutDifficultyType } from "@/ts/workouts";

export const difficultyTypesSelect = [
  { value: "hard", label: { en: "Hard", cs: "Těžké" } },
  { value: "medium", label: { en: "Medium", cs: "Střední" } },
  { value: "easy", label: { en: "Easy", cs: "Lehké" } },
];

export const difficultyTypesData: Record<
  tWorkoutDifficultyType,
  { en: string; cs: string }
> = {
  hard: { en: "Hard", cs: "Těžké" },
  medium: { en: "Medium", cs: "Střední" },
  easy: { en: "Easy", cs: "Lehké" },
};
