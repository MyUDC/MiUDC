import Image from "next/image";
import ProfileButton from "./ui/ProfileButton";

export default function ProfileTypePage() {
  return (
    <div className="h-svh flex flex-col justify-center items-center p-4 gap-6">
      <div className="flex justify-center">
        <Image
          src="/svgs/logo-inline.svg"
          alt="logotipo de MiUdc"
          width={280}
          height={280}
          priority
        />
      </div>
      <div className="flex justify-center gap-4">
        <ProfileButton href="/sign-up/career" label="Egresado" />
        <ProfileButton href="" label="Aspirante" />
      </div>
    </div>
  );
}
