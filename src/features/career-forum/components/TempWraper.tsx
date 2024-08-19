"use client";

import { useState } from "react";
import CareerImage from "@/features/career-forum/components/CareerImage/CareerImage";
import AddButton from "@/shared/components/AddButton";
import CareerContent from "@/features/career-forum/CareerContent";
import ImageView from "@/shared/components/ImageView";
import { CareerWithRelations } from "@/shared/types/CareerWithRelations"
import { CareerTitle } from "./CareerTitle";

interface Props {
  career: CareerWithRelations
}

export default function TempWraper({ career }: Props) {

  return (
    <div className="max-w-2xl mx-auto pb-2">
      <div className="border border-gray-300 rounded-lg">
        <CareerImage
          src="/telematica.jpg"
        />
        <div className="px-6 md:px-12">
          <CareerTitle facultyName={career.faculty.name} careerName={career.name} />
          <CareerContent />
          <AddButton />
        </div>
      </div>
    </div>
  );
}
