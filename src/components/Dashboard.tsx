"use client";
import { trpc } from "@/app/_trpc/client";
import UploadBtn from "@/components/dashboardCom/UploadBtn";
import { format } from "date-fns";
import { MessageSquare, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { TbMoodEmpty } from "react-icons/tb";
import Skeleton from "react-loading-skeleton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
export default function Dashboard() {
  const [loadingForDeleteOperation, setLoadingForDeleteOperation] = useState<
    string | null
  >(null);
  //utils is used to invalidate the query (meaning it will refetch the data or force the query to refetch the data)
  const utils = trpc.useContext();
  const { data: files, isLoading } = trpc.getUserData.useQuery();
  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserData.invalidate(); //invalidate the query or force the query to refetch the data after the mutation is successful
    },
    onMutate({ id }) {
      setLoadingForDeleteOperation(id);
    },
    onSettled() {
      setLoadingForDeleteOperation(null);
    },
  });
  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div
        className="flex flex-col justify-between items-center 
      gap-4 border-b border-pink-600
      pb-5 sm:flex-row sm:items-center sm:gap-0 "
      >
        <h1 className="mb-3 font-sans text-5xl mt-10 text-gray-300">
          My Documents
        </h1>
        <UploadBtn />
      </div>

      {/* Show all the files */}

      {files && files?.length !== 0 ? (
        <div className="h-screen">
          {" "}
          <ul className="mt-8 grid grid-cols-1 gap-6  md:grid-cols-2 lg:grid-cols-3">
            {files
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((item) => (
                <li
                  key={item.id}
                  className="col-span-1 divide-y divide-pink-500
              w-[80%] md:w-full  mx-auto
              shadow-md transition
               hover:shadow-lg 
               bg-gradient-to-r   from-blue-700 
           to-purple-800
           shadow-pink-600 
     
      text-lg cursor-pointer 
      hover:shadow-pink-600  hover:from-indigo-600
       hover:to-blue-900
       hover:via-violet-800"
                >
                  <Link
                    href={`/dashboard/${item.id}`}
                    className="flex flex-col gap-2"
                  >
                    <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                      <div className="h-6 w-6 flex-shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-orange-500" />
                      <div className="flex-1 truncate">
                        <div className="flex items-center space-x-3">
                          <h3 className="truncate text-lg font-medium text-white">
                            {item.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-white">
                    <div className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      {format(new Date(item.createdAt), "dd MMM yyyy")}
                    </div>

                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      mocked
                    </div>

                    <Button
                      onClick={() => deleteFile({ id: item.id })}
                      size="sm"
                      className="w-full bg-red-400 rounded hover:bg-indigo-400"
                    >
                      {loadingForDeleteOperation === item.id ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-500"></div>
                      ) : (
                        <Trash className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ) : isLoading ? (
        <div className="h-screen my-6 md:w-full w-[80%] mx-auto">
          <Skeleton
            baseColor="#202020"
            highlightColor="#444"
            height={100}
            className="my-2 "
            count={3}
          />
        </div>
      ) : (
        <div className="mt-56 h-screen flex flex-col items-center gap-3">
          <TbMoodEmpty className="h-16 w-16 text-purple-300 animate-pulse" />
          <h1 className="text-3xl font-sans font-thin ">
            There are no file here
          </h1>
          <h1 className="text-md font-sans font-thin ">
            Upload your first PDF file
          </h1>
        </div>
      )}
    </main>
  );
}
