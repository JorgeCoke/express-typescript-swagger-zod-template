import { z } from 'zod';

export const GetHealthResponseDto = z.object({ status: z.string() });
export type GetHealthResponseDto = z.infer<typeof GetHealthResponseDto>;
