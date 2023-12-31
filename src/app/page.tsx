import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserButton, auth } from "@clerk/nextjs";
import { LogIn } from "lucide-react";

import { FileUpload } from "@/components/FileUpload";

export default function Home() {
  const { userId } = auth();
  const isAuth = !!userId;
  return (
    <div className=" w-screen min-h-screen bg-gradient-to-r from-rose-100  to-teal-100 flex justify-center items-center">
      <div className=" flex flex-col items-center text-center gap-4">
        <div className=" flex  items-center">
          <h1 className=" mr-3 text-5xl font-semibold"> Chat with any PDF</h1>
          <UserButton afterSignOutUrl="/" />
        </div>
        <div className="flex">{isAuth && <Button>Go to Chats</Button>}</div>
        <p className="max-w-xl  text-lg text-slate-600">
          Join millions of students, researchers and professinals to instantly
          anwer questions and understand research with AI
        </p>

        <div className="w-full mt-4">
          {isAuth ? (
            <FileUpload />
          ) : (
            <Link href="/sign-in">
              <Button>
                Login to get Started!
                <LogIn className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
