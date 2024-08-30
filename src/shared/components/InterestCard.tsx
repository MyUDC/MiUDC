// src\shared\components\InterestCard.tsx

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

interface InterestCardProps {
  title: string;
  location: string;
  imageUrl: string;
  notifications: number;
}

export default function InterestCard({
  title,
  location,
  imageUrl,
  notifications,
}: InterestCardProps) {
  return (
    <div className="pt-2 pb-4 max-w-[750px]">
      <div className="flex flex-col mb-4 rounded-lg overflow-hidden shadow-md relative bg-white">
        <div className="relative w-full h-40">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            className="object-cover"
          />
        </div>
        {notifications > 0 && (
          <div className="absolute top-2 right-2 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faBell}
              className="text-white w-8 h-8 relative filter drop-shadow-lg"
            />
            <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              {notifications}
            </div>
          </div>
        )}
      </div>
      <div className="p-2">
        <h2 className="text-base font-bold text-black">{title}</h2>
        <p className="text-sm text-gray-600">{location}</p>
      </div>
    </div>
  );
}
