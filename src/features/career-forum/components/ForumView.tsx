import { useState } from "react";
import ExperiencesView from "@/features/career-forum/components/ForumElements/ExperiencesView";
import AsksView from "@/features/career-forum/components/ForumElements/AsksView";
import "swiper/css";

export default function ForumView() {
  const [selectedTab, setSelectedTab] = useState<"experiencias" | "preguntas">(
    "experiencias"
  );

  return (
    <div>
      <div className="flex justify-center mb-4">
        <button
          className={`flex-1 py-2 border-b-2 transition-colors duration-300 text-lg ${
            selectedTab === "experiencias"
              ? "border-green text-green font-semibold"
              : "border-transparent text-gray-600 hover:text-green"
          }`}
          onClick={() => setSelectedTab("experiencias")}
        >
          Experiencias
        </button>
        <button
          className={`flex-1 py-2 border-b-2 transition-colors duration-300 text-lg ${
            selectedTab === "preguntas"
              ? "border-green text-green font-semibold"
              : "border-transparent text-gray-600 hover:text-green"
          }`}
          onClick={() => setSelectedTab("preguntas")}
        >
          Preguntas
        </button>
      </div>
      <div className="mt-6">
        {/* Render content based on the selected tab */}
        {selectedTab === "experiencias" ? <ExperiencesView /> : <AsksView />}
      </div>
    </div>
  );
}
