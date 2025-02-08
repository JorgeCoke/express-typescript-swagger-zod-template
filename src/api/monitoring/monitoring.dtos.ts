import { z } from "zod";

export const GetHealthDto = {
	// body: z.object({ foo: z.string() }),
	// params: z.object({ foo: z.string() }),
	// query: z.object({ foo: z.string() }),
	response: z.object({ status: z.string() }),
};
