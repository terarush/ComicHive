import { z, ZodType } from "zod";

export class UserValidation {
  static readonly UPDATE_USER: ZodType = z.object({
    username: z.string().optional(),
    name: z.string().optional(),
    avatar: z.string().optional(),
    email: z.string().email().optional(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
  });

  static readonly CHANGE_PASSWORD: ZodType = z.object({
    old_password: z.string().min(6),
    new_password: z.string().min(6),
  });
}
