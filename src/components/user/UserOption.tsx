import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
  IconDefinition,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface UserOptionProps {
  href: string;
  icon: IconDefinition;
  iconColor: string;
  title: string;
  description: string;
}

export default function UserOption({
  href,
  icon,
  iconColor,
  title,
  description,
}: UserOptionProps) {
  return (
    <Link href={href}>
      <div className="mb-5 w-full">
        <div className="flex justify-between items-center px-4 mb-4">
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={icon}
              className={`mr-3 w-6 h-6 ${iconColor}`}
            />
            <div>
              <div className="text-lg font-bold text-black">{title}</div>
              <span className="text-lg text-gray-500">{description}</span>
            </div>
          </div>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="w-4 h-4 text-gray-700"
          />
        </div>
        <div className="border-t border-gray-300"></div>
      </div>
    </Link>
  );
}
