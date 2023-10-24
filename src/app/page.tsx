import Image from "next/image";
import LeftRightWidthWrapper from "@/components/LeftRightWidthWrapper";
import { AiOutlineArrowRight } from "react-icons/ai";
import Link from "next/link";
export default function Home() {
  return (
    <LeftRightWidthWrapper className="flex   flex-col items-center justify-center text-center">
      <div className="">
        <h1
          className="max-w-4xl mx-auto py-2 px-7 text-6xl md:mt-[25vh] mt-[15vh] 
         text-start  font-bold md:text-6xl  lg:text-8xl  gradient-text-landing-page"
        >
          Read the pdf in faster Way
        </h1>
        <p className="text-sm text-white font-sans  mt-4 sm:text-2xl sm:text-center">
          {" "}
          Reader allows you to have conversations with any PDF document.{" "}
          <br className="sm:visible hidden"></br> Simply upload your file and
          start asking questions right away.{" "}
        </p>
      </div>
      <div className="mt-10">
        <Link href="/dashboard">
          <button
            className="bg-gradient-to-r from-indigo-500 via-violet-900 to-blue-950
         px-4 py-2 rounded-md shadow-md shadow-pink-600 animate-bounce text-gray-200 
          text-lg cursor-pointer hover:shadow-lg
          hover:shadow-pink-500 hover:from-indigo-600 hover:to-blue-900 hover:via-violet-800"
          >
            Get Started with Reader{" "}
            <AiOutlineArrowRight className="inline-block" />
          </button>
        </Link>
      </div>
      <div className="mx-auto shadow-inner shadow-pink-600 rounded-md w-6xl my-14 p-4  ">
        <Image
          src="/img/dashboard-preview.jpg"
          width={1000}
          height={1000}
          alt="1st-image"
        />
      </div>

      <div className="flex flex-col gap-2 mt-[13vh]  md:my-[10vh]">
        <h1 className="text-6xl md:text-6xl font-bold    gradient-text-landing-page ">
          Reader make your life more easier{" "}
        </h1>
        <span className="text-6xl md:text-start md:text-7xl font-bold  gradient-text-landing-page"></span>
        <p className="text-sm md:text-2xl text-gray-300  mt-2">
          {" "}
          Using AI to get the output by just quick upload of your pdf file{" "}
        </p>
      </div>
      <div className="mx-auto shadow-inner shadow-pink-600 rounded-md mt-6 md:mt-0 w-6xl mb-8 p-4  ">
        <Image
          src="/img/file-upload-preview.jpg"
          width={1000}
          height={1000}
          alt="2nd-image"
        />
      </div>
    </LeftRightWidthWrapper>
  );
}
