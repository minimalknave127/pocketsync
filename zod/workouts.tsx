import z from "zod";

export const workoutDifficultyType = z.enum(["hard", "medium", "easy"]);

export const newWorkoutSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  difficulty: workoutDifficultyType,
  steps: z.array(
    z.object({
      name: z.string().min(1, "Step name is required"),
    })
  ),
});
