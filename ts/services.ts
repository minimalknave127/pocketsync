import { z } from "zod";

export type tService = {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  trainer_id: string;
  is_active: boolean;
  created_at: string;
};

export type tNewServiceEntry = Omit<
  tService,
  "id" | "created_at" | "is_active"
>;

export type tServicesResponse = Omit<tService, "trainer_id" | "created_at">;

export type tServiceResponse = Omit<tService, "trainer_id">;
