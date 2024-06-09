import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface ProfileButtonProps {
  href: string;
  bgColor: string;
  iconColor: string;
  label: string;
}

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
        <ProfileButton
          href="/sign-up/career"
          bgColor="bg-smoothGreen"
          iconColor="text-green"
          label="Egresado"
        />
        <ProfileButton
          href=""
          bgColor="bg-smoothYellow"
          iconColor="text-yellow"
          label="Aspirante"
        />
      </div>
    </div>
  );
}

function ProfileButton({
  href,
  bgColor,
  iconColor,
  label,
}: ProfileButtonProps) {
  return (
    <Link href={href}>
      <div
        className={`gap-2 font-semibold text-primary text-center py-4 px-6 rounded-xl flex flex-col ${bgColor}`}
      >
        <FontAwesomeIcon icon={faUser} className={`${iconColor} text-4xl`} />
        <h2 className={iconColor}>{label}</h2>
      </div>
    </Link>
  );
}
