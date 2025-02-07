import { z } from "zod";

// TODO: Add Dto generic type
export const GetHealthDto = {
	// body: z.object({ foo: z.string() }),
	// params: z.object({ foo: z.string() }),
	// query: z.object({ foo: z.string() }),
	response: z.object({ status: z.string() }),
};
