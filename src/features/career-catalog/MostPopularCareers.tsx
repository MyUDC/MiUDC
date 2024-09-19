"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { careers } from "./data/data";
import CardWithDynamicText from "./components/CardWithDynamicText";

export default function MostPopularCareers() {
  const autoplayRef = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="w-full px-0 md:px-12">
      <Carousel
        plugins={[autoplayRef.current]}
        className="w-full"
        onMouseEnter={autoplayRef.current.stop}
        onMouseLeave={autoplayRef.current.reset}
      >
        <CarouselContent>
          {careers.map((career, index) => (
            <CarouselItem key={index}>
              <CardWithDynamicText
                title={career.title}
                subtitle={career.faculty}
                imageSrc={career.imageSrc}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
}
