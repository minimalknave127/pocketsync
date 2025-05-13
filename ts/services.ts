export type tService = {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  trainer_id: string;
  icon_emoji: string;
  is_active: boolean;
  created_at: string;
};

export type tServiceOption = {
  id: string;
  name: string;
  description: string;
  service_id: string;
  order: number;
};

export type tNewServiceEntry = Omit<
  tService,
  "id" | "created_at" | "is_active"
> & {
  options: tServiceOption[];
};

export type tNewServiceOption = Omit<
  tServiceOption,
  "id" | "created_at" | "service_id"
>;
export type tServicesResponse = Omit<tService, "trainer_id" | "created_at">;

export type tServiceResponse = Omit<tService, "trainer_id"> & {
  options: tServiceOption[];
};
