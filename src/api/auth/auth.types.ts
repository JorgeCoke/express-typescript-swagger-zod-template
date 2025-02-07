import { z } from "zod";

export const PostLogInBodyDto = z.object({
	email: z.string().email(),
	password: z.string().min(4),
});
export type PostLogInBodyDto = z.infer<typeof PostLogInBodyDto>;
export const PostLogInResponseDto = z.object({ success: z.boolean() });
export type PostLogInResponseDto = z.infer<typeof PostLogInResponseDto>;

export const PostSignUpBodyDto = z.object({
	email: z.string().email(),
	password: z.string().min(4),
});
export type PostSignUpBodyDto = z.infer<typeof PostSignUpBodyDto>;
export const PostSignUpResponseDto = z.object({ success: z.boolean() });
export type PostSignUpResponseDto = z.infer<typeof PostSignUpResponseDto>;
