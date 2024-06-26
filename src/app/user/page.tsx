import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import UserOption from "@/user/components/UserOption";
import UserAvatar from "@/user/components/UserAvatar";
import userOptions from "@/user/data/userOptions";

export default function UserPage() {
  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      <div className="bg-green relative mb-4 flex flex-col p-8 w-full">
        <Link href="/">
          <FontAwesomeIcon
            icon={faTimes}
            className="mb-8 self-start w-8 h-8 text-white"
          />
        </Link>
        <UserAvatar textColor="text-white" name="Eduardo Chacón" />
      </div>
      <div className="flex flex-col w-full">
        {userOptions.map((option, index) => (
          <UserOption
            key={index}
            href={option.href}
            icon={option.icon}
            iconColor={option.iconColor}
            title={option.title}
            description={option.description}
          />
        ))}
      </div>
    </div>
  );
}
