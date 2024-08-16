"use client";
import CareerImage from "@/features/career-forum/components/CareerImage/CareerImage";
import AddButton from "@/shared/components/AddButton";
import CareerContent from "@/features/career-forum/CareerContent";

export default function CareerForumView() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="border border-gray-300 rounded-lg p-6 md:p-12">
        <CareerImage src="/telematica.jpg" />
        <div className="mt-4 mb-4 text-left text-xl font-semibold text-gray-800">
          Ingeniería de Software
          <div className="text-green font-semibold text-base">
            Facultad de Telemática
          </div>
        </div>

        <CareerContent />
        <AddButton />
      </div>
    </div>
  );
}
