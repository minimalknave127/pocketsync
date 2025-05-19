import z from "zod";

export const sWorkoutStepType = z.enum(["rest", "exercise"]);
export const sWorkoutDifficultyType = z.enum(["hard", "medium", "easy"]);
export const sWorkoutStepExerciseType = z.enum(["count", "time"]);

export const sNewWorkout = z.object({
  name: z.string().min(1, "Name is required").max(80, "Name is too long"),
  description: z.string().max(255, "Description is too long").optional(),
  // visible_to_customer: z.coerce.boolean(),
  icon_emoji: z.string().min(1, "Icon emoji is required"),
  difficulty: sWorkoutDifficultyType,
  steps: z
    .array(
      z.object({
        name: z.string().max(80, "Name is too long").optional().nullable(),
        description: z
          .string()
          .max(255, "Description is too long")
          .optional()
          .nullable(),
        duration: z.coerce.number(),
        order: z.coerce.number(),
        exercise_duration: z.coerce.number().optional().nullable(),
        repeat_count: z.coerce.number().optional().nullable(),
        rest_time: z.coerce.number().optional().nullable(),
        exercise_type: sWorkoutStepExerciseType.optional().nullable(),
        type: sWorkoutStepType,
      })
    )
    .min(1, "At least one step is required")
    .superRefine((steps, ctx) => {
      steps.map((step, index) => {
        if (step.type === "exercise" && !step.name) {
          ctx.addIssue({
            code: "custom",
            message: "Workout name is required",
            path: ["steps", index, "name"],
          });
        }
      });
    }),
});

export const sWorkoutStepSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  exercise_type: z.enum(["count", "time"]),
  repeat_count: z.preprocess(
    (val) => Number(val),
    z.number().int().min(1, "Repeat count must be at least 1")
  ),
  exercise_duration: z.coerce.number(),
  duration: z.coerce.number().optional(),
  rest_time: z
    .preprocess(
      (val) => Number(val),
      z.number().int().min(0, "Rest time cannot be negative").optional()
    )
    .default(0),
});
