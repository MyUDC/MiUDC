import { SignOutButton } from "./ui/SignOutButton";
import UserOption from "./ui/UserOption";
import userOptions from "./data/userOptions";

export default async function UserPage() {

  return (
    <div className="h-svh bg-gray-100 flex flex-col">
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
