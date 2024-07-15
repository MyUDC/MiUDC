import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import UserOption from "./ui/UserOption";
import UserAvatar from "./ui/UserAvatar";
import userOptions from "./data/userOptions";
import { SignOutButton } from "./ui/SignOutButton";
import { auth } from "@/auth.config";

export default async function UserPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      <div className="bg-green relative mb-4 flex flex-col p-8 w-full">
        <Link href="/">
          <FontAwesomeIcon
            icon={faTimes}
            className="mb-8 self-start w-8 h-8 text-white"
          />
        </Link>
<<<<<<< HEAD:src/app/user/page.tsx
        <UserAvatar textColor="text-white" name="Eduardo Chacón" />
=======
        <UserAvatar name={user?.email!} photoUrl={user?.image!} />
>>>>>>> dev:src/app/(with-ahut)/user/page.tsx
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
        <SignOutButton />
      </div>
    </div>
  );
}
