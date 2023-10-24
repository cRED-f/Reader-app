import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError, initTRPC } from "@trpc/server";

const t = initTRPC.create();
const middleware = t.middleware;

//isAuthenticated is a middleware that checks if the user is logged in
const isAuthenticated = middleware(async (options) => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user.id || !user.email) throw new TRPCError({ code: "UNAUTHORIZED" });

  return options.next({
    ctx: {
      userId: user.id,
      user,
    },
  });
});

export const router = t.router;

//publicProcedure is a helper that can be used to define procedures
//that are accessible to the public
export const publicProcedure = t.procedure;

//privateProcedure is a helper that can be used to define procedures
export const privateProcedure = t.procedure.use(isAuthenticated);
