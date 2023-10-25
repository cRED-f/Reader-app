"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Cloud, File, Loader2 } from "lucide-react";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { Progress } from "../ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "../ui/use-toast";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

const UploadDropzone = () => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState<boolean | null>(false);
  const [progress, setProgress] = useState<number>(0);
  const { toast } = useToast();
  const { startUpload } = useUploadThing("imageUploader");
  const { mutate: startPolling } = trpc.getFileInfo.useMutation({
    onSuccess: (file) => {
      router.push(`/dashboard/${file.id}`);
    },
    retry: true,
    retryDelay: 1000,
  });
  const progressHandler = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 90) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 500);

    return interval;
  };
  return (
    //multiple={false} means only one file can be uploaded at a time
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFile) => {
        setIsUploading(true);

        const progressInterval = progressHandler();
        // handle file upload
        const res = await startUpload(acceptedFile);
        if (!res) {
          return toast({
            title: "Something went wrong",
            description: "Please try again",
            variant: "destructive",
          });
        }
        const [fileres] = res;
        const key = fileres.key;

        if (!key)
          return toast({
            title: "Something went wrong",
            description: "Please try again",
            variant: "destructive",
          });

        await new Promise((resolve) => setTimeout(resolve, 2000));
        clearInterval(progressInterval);
        setProgress(100);
        startPolling({ key });
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="border h-64 border-dashed border-pink-600 rounded-lg"
        >
          <div className="flex items-center justify-center h-full w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-indigo-900
               hover:bg-indigo-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Cloud className="h-8 w-8 text-white mb-4" />
                <p className="mb-2 text-sm text-gray-300">
                  <span className="font-bold text-white ">Drag and drop</span>{" "}
                  your file
                </p>
                <p className="text-xs text-gray-300">PDF (up to 4MB)</p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div
                  className="
              bg-white flex items-center rounded-md
               overflow-hidden
             
              divide-x divide-zinc-200 "
                >
                  <div className="px-3 py-2 h-full grip place-items-center">
                    <File className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="px-3 py-2 h-full text-sm  text-gray-800 truncate">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className="w-full mt-4 max-w-xs mx-auto">
                  <Progress
                    value={progress}
                    className="h-2 w-[80%] mx-auto bg-zinc-200"
                  />
                  {progress === 100 ? (
                    <div className="flex gap-1 items-center justify-center text-sm text-white text-center pt-2">
                      <Loader2 className="h-3 w-3 animate-spin " />
                      Redirecting...
                    </div>
                  ) : null}
                </div>
              ) : null}

              <input
                {...getInputProps}
                type="file"
                id="dropzone-file"
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

export default function UploadBtn() {
  const [isShowing, setIsShowing] = useState(false);
  return (
    <Dialog
      open={isShowing}
      onOpenChange={(e) => {
        !e && setIsShowing(e);
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
        <UploadDropzone />
      </DialogContent>
    </Dialog>
  );
}
