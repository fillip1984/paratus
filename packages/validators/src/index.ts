import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export const CreateTaskSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  duration: z.number(),
});
