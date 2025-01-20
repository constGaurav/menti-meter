import { z } from "zod";

const MIN_PASSWORD_LENGTH = 6;

export const UserSignUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(MIN_PASSWORD_LENGTH, "Password must be at least 6 characters"),
});

export type TUserSignUp = z.infer<typeof UserSignUpSchema>;

export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(MIN_PASSWORD_LENGTH),
});

export type TUserLogin = z.infer<typeof UserLoginSchema>;
