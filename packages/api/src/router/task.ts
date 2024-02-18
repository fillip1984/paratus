import { z } from "zod";

import { CreateTaskSchema } from "@acme/validators";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const taskRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.task.findMany({
      orderBy: {
        id: "desc",
      },
      take: 10,
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.task.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  create: publicProcedure.input(CreateTaskSchema).mutation(({ ctx, input }) => {
    return ctx.db.task.create({
      data: {
        title: input.title,
        content: input.content,
        duration: input.duration,
      },
    });
  }),

  delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.task.delete({
      where: {
        id: input,
      },
    });
  }),
});
