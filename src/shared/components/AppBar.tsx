import { auth } from "@/auth"
import UserAvatar from "@/features/user/components/UserAvatar"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { User } from "next-auth"
import Image from "next/image"

export const AppBar = async () => {

  const session = await auth();
  const user: User | undefined = session?.user;

  return (
    <div className="flex justify-between items-center py-2 px-4">
      <UserAvatar
        photoUrl={user?.image || ""}
        height={32}
        width={32}
      />
      <Image
        src="/svgs/logo-full.svg"
        alt="logo"
        width={0}
        height={0}
        className="w-14 h-14"
      />
      <FontAwesomeIcon
        icon={faBars}
        className="w-8 h-8"
      />
    </div>
  )
}
