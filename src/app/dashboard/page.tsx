import Dashboard from "@/components/Dashboard";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  //check if user doesn't have an id (which means they are not logged in) then redirect to callback route
  if (!user || !user.id) redirect("/callback-route?value=dashboard");

  const userDb = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!userDb) redirect("/callback-route?value=dashboard");

  return <Dashboard />;
}
