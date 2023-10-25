import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { z } from "zod";
//query for getting data
//mutation for post data to server

export const appRouter = router({
  //for authentication callback route
  callBackRoute: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = getUser();

    //if user is not logged in, throw an error
    if (!user.id || !user.email) throw new TRPCError({ code: "UNAUTHORIZED" });

    //check if user is in the database
    const userDb = await db.user.findFirst({
      where: {
        id: user.id, //id is from database but user.id is from user session
      },
    });

    if (!userDb) {
      //if user is not in the database, create a new user
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      });
    }
    //otherwise return success message
    return { success: true };
  }),
  getUserData: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    return await db.file.findMany({
      where: {
        userId,
      },
    });
  }),

  //this for checking file(pdf) uploaded or not in database
  getFileInfo: privateProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const file = await db.file.findFirst({
        where: {
          key: input.key,
          userId,
        },
      });
      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

      return file;
    }),

  deleteFile: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const file = await db.file.findFirst({
        where: {
          id: input.id,
          userId,
        },
      });
      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

      await db.file.delete({
        where: {
          id: input.id,
        },
      });
      return file;
    }),
});

export type AppRouter = typeof appRouter;
