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
