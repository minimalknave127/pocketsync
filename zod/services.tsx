import { z } from "zod";

export const sServiceOptionSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(200, "Maximální délka je 100 znaků"),
  description: z.string().max(255, "Maximální délka je 100 znaků").optional(),
});

export const sNewServiceSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Maximální délka je 100 znaků"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(255, "Maximální délka je 255 znaků"),
  icon_emoji: z.string().min(1, "Icon is required"),
  price: z.string().min(1, "Price is required"),
  duration: z.string().min(1, "Duration is required"),
  options: z.array(sServiceOptionSchema),
});
