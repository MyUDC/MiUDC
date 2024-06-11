import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface ProfileButtonProps {
  href: string;
  bgColor: string;
  iconColor: string;
  label: string;
}

export default function ProfileButton({
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
