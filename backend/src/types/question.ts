import { QuestionType } from "@prisma/client";
import { z } from "zod";

export const CreateQuestionSchema = z.object({
  title: z.string().min(5),
  description: z.string().nullable(),
  questionType: z.nativeEnum(QuestionType),
  options: z.array(z.string()).min(2).max(5),
  correctAnswer: z.string(),
});

export type TCreateQuestion = z.infer<typeof CreateQuestionSchema>;
