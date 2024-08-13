import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { auth } from "@/auth";
import UserAvatar from "@/features/user/components/UserAvatar";

interface Props {
  children: React.ReactNode;
}

export default async function UserLayout({ children }: Props) {

  const session = await auth();
  const user = session?.user;



  return (
    <div className="h-svh bg-gray-100 flex flex-col">
      <div className="bg-green relative mb-4 flex flex-col p-8 w-full">
        <Link href="/home">
          <FontAwesomeIcon
            icon={faTimes}
            className="mb-8 self-start w-8 h-8 text-white"
          />
        </Link>
        <UserAvatar
          showName
          name={user?.email!}
          photoUrl={user?.image!}
          textColor="text-white"
        />
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}