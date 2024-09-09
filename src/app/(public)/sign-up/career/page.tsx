import ChooseCareerForm from "@/features/register/components/chooseCareerForm";
import getCareers from "@/shared/actions/Careers/getCareersNames";
import Image from "next/image";

export default async function CareerPage() {

  const careers = await getCareers();

  return (
    <div className="h-svh flex flex-col justify-center align-middle p-4 gap-2">
      <div className="flex justify-center">
        <Image
          src="/svgs/logo-inline.svg"
          alt="logotipo de MiUdc"
          width={230}
          height={230}
          priority
        />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-lg">Datos del estudiante</h1>
        <ChooseCareerForm careers={careers} />
      </div>
    </div>
  );
}