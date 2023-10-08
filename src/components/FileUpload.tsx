"use client";

import React, { useState } from "react";
import { Inbox, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { uploadToS3 } from "@/lib/s3";
import { useMutation } from "@tanstack/react-query";
import { createChat } from "@/services/chats";
import toast from "react-hot-toast";

export const FileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { mutate, isLoading } = useMutation({
    mutationFn: createChat,
  });
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (accepetedFiles) => {
      const file = accepetedFiles[0];

      const isFileBigger = file.size > 10 * 1024 * 1024; // bigger than 10mb
      if (isFileBigger) {
        toast.error("File too large");
        return;
      }

      try {
        setUploading(true);
        const data = await uploadToS3(file);
        if (!data?.file_key && !data?.file_name) {
          toast.error("something went wrong!");
          return;
        }
        mutate(data, {
          onSuccess: (data) => {
            console.log(data);

            // toast.success(data.message);
          },
          onError: (_err) => {
            toast.error("Error creating chat");
          },
        });
        console.log(data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setUploading(false);
      }
    },
  });

  return (
    <div className=" bg-white p-2 rounded-lg">
      <div
        {...getRootProps({
          className:
            "border border-dashed cursor-pointer h-40 bg-gray-50 py-8 flex justify-center items-center",
        })}
      >
        <input {...getInputProps()} />
        {uploading || isLoading ? (
          <div className="flex flex-col gap-2 items-center">
            {/* loading state */}
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="text-sm text-muted-foreground">
              Spilling Tea to GPT...
            </p>
          </div>
        ) : (
          <div className=" flex flex-col gap-2 items-center">
            <Inbox className=" w-10 h-10 text-blue-500" />
            <p className=" text-muted-foreground text-sm">Drop PDF here</p>
          </div>
        )}
      </div>
    </div>
  );
};
