import { tClient } from "./clients";

export type tUserTypes = "trainer" | "customer";

export interface tUser {
  id: string;
  email: string;
  password: string;
  type: tUserTypes;
  auth_type?: string | null;
  external_token?: string | null;
  is_email_verified: boolean;
  created_at: string;
}

export type tCustomerResponse = Pick<tUser, "email"> &
  Pick<tClient, "id" | "username" | "height" | "weight">;
