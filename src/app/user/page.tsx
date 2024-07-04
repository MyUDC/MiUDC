import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faSignOutAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import UserOption from "./ui/UserOption";
import UserAvatar from "@/app/user/ui/UserAvatar";
import userOptions from "@/app/user/data/userOptions";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { SignOutButton } from "./ui/SignOutButton";

export default async function UserPage() {
  const session = await auth();
  // if (!session?.user) redirect("/sign-in?returnTo=/user");
  if (!session?.user) redirect("/sign-in");

  const { user } = session;

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      <div className="bg-green relative mb-4 flex flex-col p-8 w-full">
        <Link href="/">
          <FontAwesomeIcon
            icon={faTimes}
            className="mb-8 self-start w-8 h-8 text-white"
          />
        </Link>
        <UserAvatar name={user.email!} photoUrl={user.image!} />
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
