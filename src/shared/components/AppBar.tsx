import { auth } from "@/auth";
import UserAvatar from "@/features/user/components/UserAvatar";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export const AppBar = async () => {
  const session = await auth();
  const user: User | undefined = session?.user;

  return (
    <div className="sticky w-svw top-0 z-20 bg-white bg-opacity-80 backdrop-blur-md flex justify-between items-center py-2 px-4 shadow-sm">
      <UserAvatar
        username={user?.username!}
        photoUrl={user?.image || ""}
        height={32}
        width={32}
      />
      <Link href="/home">
        <Image
          src="/svgs/logo-full.svg"
          alt="logo"
          width={0}
          height={0}
          className="w-14 h-14"
        />
      </Link>
      <FontAwesomeIcon icon={faBars} className="w-8 h-8" />
    </div>
  );
};
