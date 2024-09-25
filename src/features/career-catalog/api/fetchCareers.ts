import { getCareersWithMoreInteractions } from "@/shared/actions/Careers/categories/basedOnData/getCareersWithMoreInteractions";
import { getCareersWithMoreQuestions } from "@/shared/actions/Careers/categories/basedOnData/getCareersWithMoreQuestions";
import { getCareersWithMoreTestimonies } from "@/shared/actions/Careers/categories/basedOnData/getCareersWithMoreTestimonies";

import { getCareersBasedOnTags } from "@/shared/actions/Careers/categories/basedOnTags/getCareersBasedOnTags";

export const fetchAllCareers = async () => {
  const popularCareers = await getCareersWithMoreInteractions();
  const questionCareers = await getCareersWithMoreQuestions();
  const testimonyCareers = await getCareersWithMoreTestimonies();

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
};
