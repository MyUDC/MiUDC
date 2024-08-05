import UserAvatar from "@/features/user/components/UserAvatar"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"

export const AppBar = () => {
  return (
    <div className="flex justify-between items-center py-2 px-4">
      <UserAvatar height={32} width={32} />
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
