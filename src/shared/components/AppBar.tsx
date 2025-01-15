import { auth } from "@/auth";
import { FaRegHeart } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import UserMenuSheet from "@/shared/components/UserMenuSheet";
import { Button } from "@/components/ui/button";

export const AppBar = async () => {
  const session = await auth();

  return (
    <div className="fixed w-full top-0 z-20 border bg-white bg-opacity-80 backdrop-blur-md flex justify-between items-center py-2 px-4 shadow-sm">
      <div className="w-8 h-8 flex items-center justify-center">
        <UserMenuSheet user={session?.user} />
      </div>
      <Link href="/home" className="flex items-center justify-center">
        <Image
          src="/svgs/logo-full.svg"
          alt="logo"
          width={56}
          height={56}
          priority
        />
      </Link>
      <div className="w-8 h-8 flex items-center justify-center">
        <Button variant="outline">
          <FaRegHeart className="w-4 h-4 text-green" />
        </Button>
      </div>
    </div>
  );
};
