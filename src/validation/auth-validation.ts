import { z, ZodType } from "zod";

export class AuthValidation {
  static readonly REGISTER: ZodType = z.object({
    username: z.string().min(5).max(100),
    password: z.string().min(1).max(100),
    name: z.string().min(1).max(100),
  });
  static readonly LOGIN: ZodType = z.object({
    username: z.string().min(5).max(100),
    password: z.string().min(1).max(100),
  });
}
