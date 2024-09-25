import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface SmallCareerCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  slug: string;
}

export default function SmallCareerCard({
  title,
  subtitle,
  imageUrl,
  slug,
}: SmallCareerCardProps) {
  return (
    <Link href={`/career/${slug}`} passHref>
      <Card className="h-[320px] flex flex-col cursor-pointer w-full">
        <CardHeader className="flex-grow flex flex-col justify-center space-y-1">
          <h4 className="text-lg font-bold line-clamp-2 text-black">{title}</h4>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {subtitle}
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative h-[180px] w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              layout="fill"
              objectFit="cover"
              priority={true}
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
