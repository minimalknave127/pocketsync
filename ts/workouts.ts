export type tWorkoutStepType = "rest" | "exercise";
export type tWorkoutDifficultyType = "hard" | "medium" | "easy";
export type tWorkoutStepExcerciseType = "count" | "time";
export interface tWorkout {
  id: string;
  description?: string | null;
  trainer_id: string;
  name: string;
  difficulty: tWorkoutDifficultyType;
  created_at: Date;
}

export interface tWorkoutStep {
  id: number;
  name: string;
  description?: string | null;
  workout_id: string;
  order: number;
  duration?: number;
  type: tWorkoutStepType;
  restTime?: number;
  repeatCount?: number;
  exerciseDuration?: number;
  exerciseType?: tWorkoutStepExcerciseType;
}

export interface tCustomerWorkout {
  id: number;
  customer_id: string;
  workout_id: string;
  last_step_id: number;
  created_at: Date;
  visible_to_customer: boolean;
}

// ENTRIES
export type tNewWorkoutEntry = Omit<tWorkout, "id" | "created_at">;
export type tNewWorkoutStepEntry = Omit<tWorkoutStep, "id" | "created_at">;

export type tNewCustomerWorkoutEntry = Omit<
  tCustomerWorkout,
  "id" | "created_at"
>;

// RESPONSES
export type tWorkoutResponse = Omit<tWorkout, "trainer_id" | "created_at"> & {
  steps: Omit<tWorkoutStep, "workout_id">[];
  total_duration: number;
};

export type tWorkoutsResponse = Omit<tWorkout, "trainer_id" | "created_at"> & {
  total_duration: number;
  steps_count: number;
};
