import ChatBox from "@/components/ChatBox";
import PdfViewer from "@/components/PdfViewer";
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
  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-h-8xl grow lg:flex xl:px-2">
        {/*left side */}
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <PdfViewer />
          </div>
        </div>

        {/*right side */}
        <div
          className="flex-[0.75] shrink-0 border-t border-gray-200 lg:w-96
        lg:border-1 lg:border-t-0"
        >
          <ChatBox />
        </div>
      </div>
    </div>
  );
}
