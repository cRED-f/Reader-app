"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
export default function UploadBtn() {
  const [isShowing, setIsShowing] = useState(false);
  return (
    <Dialog
      open={isShowing}
      onOpenChange={(e) => {
        !e && setIsShowing(e);
        // if (!e) setIsShowing(e);
      }}
    >
      <DialogTrigger onClick={() => setIsShowing(true)} asChild>
        <button
          className="bg-gradient-to-r from-indigo-500 via-violet-900
           to-blue-950
        w-[80%] md:w-[20%] py-2 md:mt-6  shadow-md shadow-pink-600 
          text-gray-200 
          text-lg cursor-pointer hover:shadow-lg
          hover:shadow-pink-500 hover:from-indigo-600
           hover:to-blue-900
           hover:via-violet-800"
        >
          Upload
        </button>
      </DialogTrigger>
      <DialogContent
        className="bg-gradient-to-r from-indigo-500 via-violet-900
           to-blue-950
        shadow-md shadow-pink-600 
          text-gray-200 
          text-lg cursor-pointer hover:shadow-lg
          hover:shadow-pink-500 hover:from-indigo-600
           hover:to-blue-900
           hover:via-violet-800"
      >
        Upload a PDF file
      </DialogContent>
    </Dialog>
  );
}
