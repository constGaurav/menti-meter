import { z } from "zod";

export const CreateQuizSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export type TCreateQuiz = z.infer<typeof CreateQuizSchema>;
