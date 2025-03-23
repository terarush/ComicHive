import { z, ZodType } from "zod";

export class AuthValidation {
  static readonly REGISTER: ZodType = z.object({
    username: z.string().min(5).max(100),
    password: z.string().min(1).max(100),
    email: z.string().email().max(100),
    first_name: z.string().max(100),
    last_name: z.string().max(100)
  });
  static readonly LOGIN: ZodType = z.object({
    username: z.string().min(5).max(100),
    password: z.string().min(1).max(100),
  });
}
