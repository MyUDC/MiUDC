import React from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Importa el hook de Next.js
import { useTextColor } from "@/shared/hooks/useTextColor";

interface CardWithDynamicTextProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  slug: string; // Añade el slug de la carrera
}

export default function CardWithDynamicText({
  title,
  subtitle,
  imageSrc,
  slug,
}: CardWithDynamicTextProps) {
  const router = useRouter();
  const textColor = useTextColor(imageSrc);

  const handleCardClick = () => {
    router.push(`/career/${slug}`);
  };

  return (
    <Card
      className="relative overflow-hidden h-[300px] w-2xl mx-auto cursor-pointer"
      onClick={handleCardClick}
    >
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
  );
}
