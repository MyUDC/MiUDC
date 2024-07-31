import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import InterestCard from "@/components/InterestCard/InterestCard";
import UserAvatar from "../../(with-auth)/user/ui/UserAvatar";
import interests from "./data/interests";
import { auth } from "@/auth.config";

export default async function Interests() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-green relative mb-4 flex flex-col p-8 w-full">
        <Link href="/user">
          <FontAwesomeIcon
            icon={faTimes}
            className="mb-8 self-start w-8 h-8 text-white"
          />
        </Link>
        <UserAvatar
          name={user?.email!}
          photoUrl={user?.image!}
          textColor="text-white"
        />
      </div>
      <div className="p-4 flex-1">
        <h1 className="text-2xl font-bold">Tus intereses</h1>
        {interests.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-2">
            {interests.map((interest, index) => (
              <InterestCard key={index} {...interest} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-full py-8">
            <p className="text-gray-500 text-lg">
              No tienes intereses agregados aún.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
