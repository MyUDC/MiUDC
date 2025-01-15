import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import CareerListSheet from "./CareerListSheet";
import { getCareersBasedOnTags } from "@/shared/actions/Careers/categories/basedOnTags/getCareersBasedOnTags";
import { Career } from "@/features/career-catalog/types/Career";

interface CategoryCardProps {
  title: string;
  gradient: string;
  image: string;
  tags: string[];
}

// Define a type for the response you expect from getCareersBasedOnTags
interface SimplifiedCareer {
  id: string;
  name: string;
  slug: string;
  faculty: string;
  tags: string[];
}

export default function CategoryCard({
  title,
  gradient,
  image,
  tags,
}: CategoryCardProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [careers, setCareers] = useState<Career[]>([]);

  const handleClick = async () => {
    const fetchedCareers: SimplifiedCareer[] = await getCareersBasedOnTags(
      tags
    );

    // Map the fetched careers to match the Career type
    const mappedCareers: Career[] = fetchedCareers.map((career) => ({
      ...career,
      website: "", // Default value
      study_plan_url: "", // Default value
      location: "", // Default value
      latitude: 0, // Default value
      longitude: 0, // Default value
      description: "", // Default value
      facultyId: "", // Default value
      semesters: 8, // Default value
      createdAt: new Date(), // Default value
      updatedAt: new Date(), // Default value
      faculty: {
        id: "", // Default value
        name: career.faculty, // Use the faculty string from fetched data
        createdAt: new Date(), // Default value
        updatedAt: new Date(), // Default value
      },
    }));

    setCareers(mappedCareers);
    setIsSheetOpen(true);
  };

  return (
    <>
      <Card
        className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
        onClick={handleClick}
      >
        <CardContent className={`p-0 h-[140px] ${gradient}`}>
          <div className="flex flex-col justify-between h-full">
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
            <div className="flex justify-start mb-2 ml-2">
              <span className="font-medium text-lg text-white max-w-36">
                {title}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <CareerListSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title={title}
        careers={careers}
      />
    </>
  );
}
