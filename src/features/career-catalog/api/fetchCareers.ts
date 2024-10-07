import { getCareersWithMoreInteractions } from "@/shared/actions/Careers/categories/basedOnData/getCareersWithMoreInteractions";
import { getCareersWithMoreQuestions } from "@/shared/actions/Careers/categories/basedOnData/getCareersWithMoreQuestions";
import { getCareersWithMoreTestimonies } from "@/shared/actions/Careers/categories/basedOnData/getCareersWithMoreTestimonies";
import { getCareersBasedOnTags } from "@/shared/actions/Careers/categories/basedOnTags/getCareersBasedOnTags";
import { Career } from "@/features/career-catalog/types/Career";

export async function fetchAllCareers(): Promise<{
  popularCareers: Career[];
  questionCareers: Career[];
  testimonyCareers: Career[];
  creativeCareers: Career[];
  techCareers: Career[];
  communicationCareers: Career[];
}> {
  "use server";

  const defaultCareerFields = {
    website: "",
    study_plan_url: "",
    location: "",
    latitude: 0,
    longitude: 0,
    description: "",
    facultyId: "",
    semesters: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mapFaculty = (facultyName: string) => ({
    id: "",
    name: facultyName,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const popularCareers = await getCareersWithMoreInteractions().then((data) =>
    data.map((career) => ({
      ...career,
      faculty: mapFaculty(career.faculty), // Mapeo del campo faculty
      tags: [],
      ...defaultCareerFields, // Completa los campos faltantes con valores por defecto
    }))
  );

  const questionCareers = await getCareersWithMoreQuestions().then((data) =>
    data.map((career) => ({
      ...career,
      faculty: mapFaculty(career.faculty),
      tags: [],
      ...defaultCareerFields,
    }))
  );

  const testimonyCareers = await getCareersWithMoreTestimonies().then((data) =>
    data.map((career) => ({
      ...career,
      faculty: mapFaculty(career.faculty),
      tags: [],
      ...defaultCareerFields,
    }))
  );

  const creativeCareers = await getCareersBasedOnTags([
    "Creatividad",
    "Arte",
    "Pensamiento",
  ]).then((data) =>
    data.map((career) => ({
      ...career,
      faculty: mapFaculty(career.faculty),
      ...defaultCareerFields,
    }))
  );

  const techCareers = await getCareersBasedOnTags([
    "Tecnología",
    "Innovación",
    "Computación",
  ]).then((data) =>
    data.map((career) => ({
      ...career,
      faculty: mapFaculty(career.faculty),
      ...defaultCareerFields,
    }))
  );

  const communicationCareers = await getCareersBasedOnTags([
    "Comunicación",
    "Medios",
    "Periodismo",
  ]).then((data) =>
    data.map((career) => ({
      ...career,
      faculty: mapFaculty(career.faculty),
      ...defaultCareerFields,
    }))
  );

  return {
    popularCareers,
    questionCareers,
    testimonyCareers,
    creativeCareers,
    techCareers,
    communicationCareers,
  };
}
