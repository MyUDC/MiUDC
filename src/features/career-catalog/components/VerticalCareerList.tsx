import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Career } from "@/features/career-catalog/types/Career";

interface VerticalCareerListProps {
  careers: Career[];
}

export default function VerticalCareerList({
  careers,
}: VerticalCareerListProps) {
  return (
    <div className="space-y-4">
      {careers.map((career) => (
        <Link href={`/career/${career.slug}`} key={career.id} className="block">
          <Card className="p-4">
            <div className="flex items-center space-x-4 mb-2">
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
                <p className="text-sm text-muted-foreground uppercase mb-2">
                  {career.faculty}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {career.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
