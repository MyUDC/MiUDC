import { getCareersWithMoreInteractions } from "@/shared/actions/Careers/categories/basedOnData/getCareersWithMoreInteractions";
import { getCareersWithMoreQuestions } from "@/shared/actions/Careers/categories/basedOnData/getCareersWithMoreQuestions";
import { getCareersWithMoreTestimonies } from "@/shared/actions/Careers/categories/basedOnData/getCareersWithMoreTestimonies";

import { getCareersBasedOnTags } from "@/shared/actions/Careers/categories/basedOnTags/getCareersBasedOnTags";
interface Career {
  id: string;
  name: string;
  slug: string;
  faculty: string;
  tags: string[];
}

export async function fetchAllCareers(): Promise<{
  popularCareers: Career[];
  questionCareers: Career[];
  testimonyCareers: Career[];
  creativeCareers: Career[];
  techCareers: Career[];
  communicationCareers: Career[];
}> {
  "use server";

  const popularCareers = await getCareersWithMoreInteractions().then((data) =>
    data.map((career) => ({ ...career, tags: [] }))
  );
  const questionCareers = await getCareersWithMoreQuestions().then((data) =>
    data.map((career) => ({ ...career, tags: [] }))
  );
  const testimonyCareers = await getCareersWithMoreTestimonies().then((data) =>
    data.map((career) => ({ ...career, tags: [] }))
  );
  const creativeCareers = await getCareersBasedOnTags([
    "Creatividad",
    "Arte",
    "Pensamiento",
  ]);
  const techCareers = await getCareersBasedOnTags([
    "Tecnología",
    "Innovación",
    "Computación",
  ]);
  const communicationCareers = await getCareersBasedOnTags([
    "Comunicación",
    "Medios",
    "Periodismo",
  ]);

  return {
    popularCareers,
    questionCareers,
    testimonyCareers,
    creativeCareers,
    techCareers,
    communicationCareers,
  };
}
