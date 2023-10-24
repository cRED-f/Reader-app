import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";

interface Params {
  params: {
    id: string;
  };
}

export default async function page({ params }: Params) {
  const { id } = params;

  const { getUser } = getKindeServerSession();
  const user = getUser();

  //check if user doesn't have an id (which means they are not logged in) then redirect to callback route
  if (!user || !user.id) redirect(`/callback-route?value=dashboard/${id}`);

  //database logic here
  const file = await db.file.findFirst({
    where: {
      id: id, //file id
      userId: user.id,
    },
  });
  if (!file) notFound();
  return <div>{id}</div>;
}
