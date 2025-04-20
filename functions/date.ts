import { getLocales } from "expo-localization";

export function dateToLocale(date: string | Date, hideTime?: boolean) {
  const d = new Date(date).toLocaleString(getLocales()[0].languageCode, {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
    hour: hideTime ? undefined : "2-digit",
    minute: hideTime ? undefined : "2-digit",
    hourCycle: "h24",
  });

  return d;
}

export function timeToLocale(date: string) {
  const d = new Date(date).toLocaleTimeString(getLocales()[0].languageCode, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h24",
  });
  return d;
}
