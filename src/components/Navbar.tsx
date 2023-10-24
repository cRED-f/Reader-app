import LeftRightWidthWrapper from "./LeftRightWidthWrapper";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import Link from "next/link";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
export default function Navbar() {
  return (
    <div
      className="sticky h-14  z-30 top-0 w-full 
   bg-gradient-to-tr
   from-indigo-800 
  via-bg-[#0D3145] to-indigo-950 backdrop-blur-3xl border-b   border-gray-300/50 transition-all"
    >
      <LeftRightWidthWrapper>
        <div className=" flex justify-between">
          <div className="h-10 ">
            <Link href="/">
              <h1
                className="text-3xl font-sans text-center py-2  cursor-pointer hover:text-pink-400
              hover:transition-colors hover:duration-500 hover:ease-in-out"
              >
                Reader
              </h1>
            </Link>
          </div>
          <div className="flex   gap-6 ">
            {" "}
            <div>
              <Link href="/pricing">
                <h1
                  className="text-1xl font-sans text-end md:text-center py-3  cursor-pointer hover:text-pink-400
              hover:transition-colors hover:duration-500 hover:ease-in-out"
                >
                  Price
                </h1>
              </Link>
            </div>
            <div>
              <LoginLink>
                <h1
                  className="text-1xl text-end font-sans md:text-center py-3  cursor-pointer hover:text-pink-400
              hover:transition-colors hover:duration-500 hover:ease-in-out"
                >
                  Sign in
                </h1>
              </LoginLink>
            </div>
            <div>
              {" "}
              <RegisterLink>
                <button
                  className="bg-gradient-to-r from-indigo-500 via-violet-900 to-blue-950
         px-4 py-2 rounded-md    text-gray-200 
          text-lg cursor-pointer hover:shadow-lg
          hover:from-indigo-600 hover:to-blue-900 mt-1
           hover:via-violet-800 hidden  md:block"
                >
                  Get Started <AiOutlineArrowRight className="inline-block" />
                </button>
              </RegisterLink>
            </div>
          </div>
        </div>
      </LeftRightWidthWrapper>
    </div>
  );
}
