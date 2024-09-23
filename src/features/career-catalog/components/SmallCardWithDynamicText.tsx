import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface SmallCardWithDynamicTextProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export default function SmallCardWithDynamicText({
  title,
  subtitle,
  imageUrl,
}: SmallCardWithDynamicTextProps) {
  return (
    <Card className="w-[270px] h-[320px] flex flex-col">
      <CardHeader className="flex-grow flex flex-col justify-center space-y-1">
        <h4 className="text-lg font-bold line-clamp-2">{title}</h4>
        <p className="text-sm text-muted-foreground line-clamp-1">{subtitle}</p>
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
  );
}
