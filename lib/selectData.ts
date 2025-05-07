// import { LanguagesTypes } from "@/ts/global";

import { tWorkoutDifficultyType, tWorkoutStepType } from "@/ts/workouts";

export const difficultyTypesSelect = (lang: "cs" | "en") => {
  const selectData = [
    { value: "hard", label: { en: "Hard", cs: "Těžké" } },
    { value: "medium", label: { en: "Medium", cs: "Střední" } },
    { value: "easy", label: { en: "Easy", cs: "Lehké" } },
  ];

  return selectData.map((item) => ({
    value: item.value,
    label: item.label[lang],
  }));
};

export const difficultyTypesData: Record<
  tWorkoutDifficultyType,
  { en: string; cs: string }
> = {
  hard: { en: "Hard", cs: "Těžké" },
  medium: { en: "Medium", cs: "Střední" },
  easy: { en: "Easy", cs: "Lehké" },
};

export const wokrkoutStepTypesSelect = (lang: "cs" | "en") => {
  const selectData = [
    { value: "rest", label: { en: "Rest", cs: "Pauza" } },
    { value: "exercise", label: { en: "Exercise", cs: "Cvik" } },
  ];

  return selectData.map((item) => ({
    value: item.value,
    label: item.label[lang],
  }));
};

export const wokrkoutStepTypesData: Record<
  tWorkoutStepType,
  { en: string; cs: string }
> = {
  rest: { en: "Rest", cs: "Pauza" },
  exercise: { en: "Exercise", cs: "Cvik" },
};
