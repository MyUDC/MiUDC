"use client";
import { useState } from "react";
import CareerImage from "@/features/career-forum/components/CareerImage/CareerImage";
import AddButton from "@/shared/components/AddButton";
import CareerContent from "@/features/career-forum/CareerContent";
import ImageView from "@/shared/components/ImageView";

export default function CareerForumView() {
  const [showImageView, setShowImageView] = useState(false);

  return (
    <div className="max-w-2xl mx-auto p-2">
      <div className="border border-gray-300 rounded-lg">
        <CareerImage
          src="/telematica.jpg"
          onClick={() => setShowImageView(true)}
          onClose={() => setShowImageView(false)} // Maneja el cierre
        />
        <div className="px-6 md:px-12">
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

      {showImageView && (
        <ImageView
          imageUrls={["/telematica.jpg"]}
          initialIndex={0}
          onClose={() => setShowImageView(false)}
        />
      )}
    </div>
  );
}
