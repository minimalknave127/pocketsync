import z from "zod";

export const sWorkoutDifficultyType = z.enum(["hard", "medium", "easy"]);

export const sNewWorkoutSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  difficulty: sWorkoutDifficultyType,
  steps: z.array(
    z.object({
      name: z.string().min(1, "Step name is required"),
    })
  ),
});

export const sWorkoutStepSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  exerciseType: z.enum(["count", "time"]),
  repeatCount: z.preprocess(
    (val) => Number(val),
    z.number().int().min(1, "Repeat count must be at least 1")
  ),
  exerciseDuration: z.coerce.number(),
  duration: z.coerce.number().optional(),
  restTime: z
    .preprocess(
      (val) => Number(val),
      z.number().int().min(0, "Rest time cannot be negative").optional()
    )
    .default(0),
});
