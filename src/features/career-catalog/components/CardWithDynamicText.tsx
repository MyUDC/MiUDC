import React, { useState } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useTextColor } from "@/shared/hooks/useTextColor";

interface CardWithDynamicTextProps {
  title: string;
  subtitle: string;
  imageSrc: string;
}

export default function CardWithDynamicText({
  title,
  subtitle,
  imageSrc,
}: CardWithDynamicTextProps) {
  const textColor = useTextColor(imageSrc);

  return (
    <Card className="relative overflow-hidden h-[300px] w-2xl mx-auto">
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
        className="absolute inset-0 object-cover cursor-grab"
        src={imageSrc}
        layout="fill"
      />
      <CardFooter className="absolute bottom-0 left-0 right-0 bg-black/40 border-t border-default-600 flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <Avatar className="w-10 h-10">
            <Image alt="" src="/loro.png" layout="fill" />
          </Avatar>
          <div>
            <p className="text-xs text-white/90">Testimonio</p>
            <p className="text-xs text-white/80">Las clases de educación...</p>
          </div>
        </div>
        <Button size="sm" variant="secondary">
          Ver Detalles
        </Button>
      </CardFooter>
    </Card>
  );
}
