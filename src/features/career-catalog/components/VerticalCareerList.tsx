import React from "react";
import Image from "next/image";
import Link from "next/link";

type Career = {
  id: string;
  name: string;
  slug: string;
  faculty: string;
};

interface VerticalCareerListProps {
  careers: Career[];
}

const VerticalCareerList: React.FC<VerticalCareerListProps> = ({ careers }) => {
  return (
    <div className="space-y-4">
      {careers.map((career) => (
        <Link href={`/career/${career.slug}`} key={career.id} className="block">
          <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex-shrink-0">
              <Image
                src="/telematica.jpg"
                alt={career.name}
                width={200}
                height={200}
                className="rounded-sm"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{career.name}</h3>
              <p className="text-sm text-gray-500">{career.faculty}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default VerticalCareerList;
