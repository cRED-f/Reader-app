"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";

export default function page() {
  const router = useRouter();
  const searchParam = useSearchParams();
  const value = searchParam.get("value");

  //check if user is not logged in, redirect to login page
  //undifined because we are not logged in
  trpc.callBackRoute.useQuery(undefined, {
    onSuccess: ({ success }) => {
      if (success) {
        //if success is true, redirect to dashboard and user is sync to database
        router.push(value ? `/${value}` : "/dashboard");
      }
    },
    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED") {
        router.push("/sign-in");
      }
    },
    //retry if error
    retry: true,
    retryDelay: 1000,
  });

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-10 w-20 border-t-2 border-b-2 border-purple-500"></div>

        <h1 className="text-2xl  mt-4 font-bold gradient-text-landing-page">
          Please wait
        </h1>

        <p className="text-gray-500">
          We are syncing your account with our database
        </p>
      </div>
    </div>
  );
}
