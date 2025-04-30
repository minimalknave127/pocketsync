export const APP_ROUTES = {
  home: "/",
  services: "/services",
  workouts: "/workouts",
  clients_tab: "/(app)/(tabs)/clients",
} as const;

export type AppRoute = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];
