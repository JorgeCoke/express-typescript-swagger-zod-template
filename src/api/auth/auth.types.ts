import { z } from 'zod';

export const LogInBodyDto = z.object({ email: z.string().email(), password: z.string().min(4) });
export type LogInBodyDto = z.infer<typeof LogInBodyDto>;
export const LogInQueryDto = z.object({ foo: z.number().optional() });
export type LogInQueryDto = z.infer<typeof LogInQueryDto>;
export const LogInResponseDto = z.object({ success: z.boolean() });
export type LogInResponseDto = z.infer<typeof LogInResponseDto>;
