import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface ProfileButtonProps {
  href: string;
  label: string;
}

export default function ProfileButton({ href, label }: ProfileButtonProps) {
  const colors = {
    Egresado: {
      bgColor: "bg-smoothGreen",
      iconColor: "text-green",
    },
    Aspirante: {
      bgColor: "bg-smoothYellow",
      iconColor: "text-yellow",
    },
  }[label];

  return (
    <Link href={href}>
      <div
        className={`gap-2 font-semibold text-primary text-center py-4 px-6 rounded-xl flex flex-col ${colors?.bgColor}`}
      >
        <FontAwesomeIcon
          icon={faUser}
          className={`${colors?.iconColor} text-4xl`}
        />
        <h2 className={colors?.iconColor}>{label}</h2>
      </div>
    </Link>
  );
}
