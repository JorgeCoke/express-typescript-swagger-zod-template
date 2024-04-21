import { z } from 'zod';

export const PostLogInBodyDto = z.object({ email: z.string().email(), password: z.string().min(4) });
export type PostLogInBodyDto = z.infer<typeof PostLogInBodyDto>;
export const PostLogInQueryDto = z.object({ foo: z.number().optional() });
export type PostLogInQueryDto = z.infer<typeof PostLogInQueryDto>;
export const PostLogInResponseDto = z.object({ success: z.boolean() });
export type PostLogInResponseDto = z.infer<typeof PostLogInResponseDto>;
