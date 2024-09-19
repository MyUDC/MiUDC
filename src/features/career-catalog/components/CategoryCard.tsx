import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface CategoryCardProps {
  title: string;
  gradient: string;
  image: string;
}

export default function CategoryCard({
  title,
  gradient,
  image,
}: CategoryCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden">
      <CardContent className={`p-0 h-[140px] ${gradient}`}>
        <div className="flex flex-col justify-between h-full">
          {/* Imagen alineada a la derecha */}
          <div className="flex justify-end mt-2 mr-2">
            <div className="w-16 h-16 relative">
              <Image
                src={image}
                alt={title}
                layout="fill"
                objectFit="contain"
                priority={true}
              />
            </div>
          </div>
          {/* Título alineado a la izquierda */}
          <div className="flex justify-start mb-2 ml-2">
            <span className="font-bold text-lg text-white max-w-36">
              {title}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
