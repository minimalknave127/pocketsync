export type tGoalStatuses = "in_progress" | "complete" | "incomplete";

export type tGoal = {
  id: string;
  customer_id: string;
  trainer_id: string;
  icon_emoji: string;
  name: string;
  order: number;
  complete_to_date: Date;
  completed_date?: Date | null;
  status: tGoalStatuses;
  created_at: Date;
};

export type tGoalsRes = Omit<tGoal, "created_at" | "trainer_id">;
export type tNewGoalEntry = Omit<
  tGoal,
  "id" | "completed_date" | "created_at" | "status"
>;
