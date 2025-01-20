import { z } from "zod";

export const UserSignUpSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export type TUserSignUp = z.infer<typeof UserSignUpSchema>;
