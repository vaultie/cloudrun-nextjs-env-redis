import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getRedisString, setRedis } from "~/server/redis";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
    redis: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      await setRedis(input.text,new Date().toString());
      const getRedis = await getRedisString(input.text);
      return {
        greeting: `Redis Worked ${getRedis}`,
      };
    }),
});
