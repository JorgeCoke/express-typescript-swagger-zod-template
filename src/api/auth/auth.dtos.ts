import { z } from "zod";

export const PostLogInDto = {
	body: z.object({
		email: z.string().email(),
		password: z.string().min(4),
	}),
	response: z.object({ success: z.boolean() }),
};

export const PostSignUpDto = {
	body: z.object({
		email: z.string().email(),
		password: z.string().min(4),
	}),
	response: z.object({ success: z.boolean() }),
};
