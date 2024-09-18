import { cookies } from "next/headers";

import ChooseCareerForm from "@/features/register/components/chooseCareerForm";
import getCareers from "@/shared/actions/Careers/getCareersNames";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Cookie from 'js-cookie';

export default async function CareerPage() {

  const careers = await getCareers();
  const cookieStore = cookies();
  const accountNumber = cookieStore.get('accountNumber')?.value;
  const career = cookieStore.get('career')?.value;
  const semester = cookieStore.get('semester')?.value;

  const formInitialValues = {
    accountNumber: accountNumber ?? "",
    career: career ?? "",
    semester: semester ?? "",
  }
  console.log(formInitialValues);
  

  return (
    <section className="bg-gray-50 relative">
      <Link href="/welcome" className="absolute top-4 left-4 text-green">
        <FaArrowLeft className="w-6 h-6" />
      </Link>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex justify-center">
          <Image
            src="/svgs/logo-inline.svg"
            alt="logotipo de MiUdc"
            width={230}
            height={230}
            priority
          />
        </div>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Datos de Estudiante
            </h1>
            <ChooseCareerForm initialValues={formInitialValues} careers={careers} />
          </div>
        </div>
      </div>
    </section>
  );
}