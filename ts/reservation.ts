import { tServicesResponse } from "./services";
import { tClient, tClientRes, tTrainerClientsRes } from "./users/clients";

export type tReservationStatus =
  | "pending"
  | "accepted"
  | "declined"
  | "canceled"
  | "change_requested"
  | "deleted_by_trainer"
  | "deleted_by_customer";

export interface tReservation {
  id: string;
  notes?: string | null;
  trainer_id: string | null;
  customer_id: string | null;
  date: Date;
  duration: number;
  new_suggested_date: Date | null;
  status: tReservationStatus;
  workout_id?: string | null;
  service_id: string;
  created_at: string | null;
}

export type tNewReservation = Omit<
  tReservation,
  "id" | "created_at" | "new_suggested_date" | "status"
> &
  Partial<Pick<tReservation, "status">> & {
    repeat_interval?:
      | "none"
      | "daily"
      | "per day"
      | "3 days"
      | "1 week"
      | "2 week";
    repeat_count?: number;
    check_overlapping?: boolean;
    customer: tTrainerClientsRes;
    service: tServicesResponse;
  };

export type tReservationsRes = Pick<
  tReservation,
  "id" | "status" | "duration" | "date" | "notes"
> & {
  customer: Pick<tClient, "id" | "username">;
};
