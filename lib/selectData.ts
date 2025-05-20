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

export const reservationRepeatSelect = (lang: "cs" | "en") => {
  const selectData = [
    { value: "none", label: { en: "None", cs: "Žádný" } },
    { value: "daily", label: { en: "Daily", cs: "Denní" } },
    { value: "per day", label: { en: "Per day", cs: "Přes den" } },
    { value: "3 days", label: { en: "Per 3 days", cs: "Přes káždé 3 dny" } },
    { value: "1 week", label: { en: "Weekly", cs: "Týdenní" } },
    { value: "2 week", label: { en: "Per 2 weeks", cs: "Přes káždé 2 tydny" } },
  ];

  return selectData.map((item) => ({
    value: item.value,
    label: item.label[lang],
  }));
};

export const reservationRepeatData = {
  none: { en: "None", cs: "Žádný" },
  daily: { en: "Daily", cs: "Denní" },
  "per day": { en: "Per day", cs: "Přes den" },
  "3 days": { en: "Per 3 days", cs: "Přes káždé 3 dny" },
  "1 week": { en: "Weekly", cs: "Týdenní" },
  "2 week": { en: "Per 2 weeks", cs: "Přes káždé 2 tydny" },
};
