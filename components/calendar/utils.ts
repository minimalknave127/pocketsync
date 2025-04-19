import { addDays } from "date-fns";
export const getDays = (start = new Date(), daysToShow = 30) => {
  return Array.from({ length: daysToShow }).map((_, i) => addDays(start, i));
};
