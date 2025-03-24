import { z, ZodType } from "zod";

export class UpdateUserValidation {
  static readonly UPDATE_USER: ZodType = z.object({
    username: z.string().optional(),
    name: z.string().optional(),
    avatar: z.string().optional(),
    email: z.string().email().optional(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
  });
}

