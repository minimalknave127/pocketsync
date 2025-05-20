import { tUser } from "./users";

export type tTrainerClientsRes = Pick<tClient, "id" | "username"> &
  Pick<tUser, "email"> & {
    reservations_count: number;
  };
export interface tClient {
  id: string;
  username: string;
  group_id: number;
  weight: number;
  height: number;
}

export interface tClientsGrups {
  id: number;
}

export type tClientEntry = Pick<tClient, "username" | "id">;
export type tClientsGroupsEntry = Omit<tClientsGrups, "id">;

export type tClientRes = Pick<tUser, "email"> &
  Pick<tClient, "id" | "username" | "height" | "weight">;
