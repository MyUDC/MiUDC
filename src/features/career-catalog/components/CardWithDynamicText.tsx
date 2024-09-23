import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useTextColor } from "@/shared/hooks/useTextColor";

interface CardWithDynamicTextProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  slug: string;
}

export default function CardWithDynamicText({
  title,
  subtitle,
  imageSrc,
  slug,
}: CardWithDynamicTextProps) {
  const textColor = useTextColor(imageSrc);

  return (
    <Link href={`/career/${slug}`} passHref>
      <Card className="relative overflow-hidden h-[300px] w-2xl mx-auto cursor-pointer">
        <CardHeader
          className={`absolute z-10 top-1 flex-col items-start ${textColor}`}
        >
          <p className={`text-sm ${textColor}/60 uppercase font-bold`}>
            {subtitle}
          </p>
          <CardTitle className={`${textColor} text-xl font-medium`}>
            {title}
          </CardTitle>
        </CardHeader>
        <Image
          alt="Card background"
          className="absolute inset-0 object-cover cursor-pointer"
          src={imageSrc}
          layout="fill"
        />
      </Card>
    </Link>
  );
}
