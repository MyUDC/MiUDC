import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card"; // Import the Card component from shadcn

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
          <Card className="flex items-center space-x-4 p-4">
            <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-sm">
              <Image
                src="/telematica.jpg"
                alt={career.name}
                width={150}
                height={100}
                className="object-cover w-full h-full rounded-sm"
              />
            </div>
            <div>
              <h3 className="font-semibold leading-none tracking-tight mb-1">
                {career.name}
              </h3>
              <p className="text-sm text-muted-foreground uppercase">
                {career.faculty}
              </p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default VerticalCareerList;
