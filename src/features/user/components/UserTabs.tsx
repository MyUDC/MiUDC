"use client";

import { useState } from "react";
import Testimonios from "@/app/(auth)/(no-app-bar))/user/testimonials/page";
import Preguntas from "@/app/(auth)/(no-app-bar))/user/[username]/questions/page";
import Likes from "@/app/(auth)/(no-app-bar))/user/[username]/likes/page";
import Guardados from "@/app/(auth)/(no-app-bar))/user/[username]/saved-items/page";

const tabs = [
  { id: "testimonios", label: "Testimonios", component: Testimonios },
  { id: "preguntas", label: "Preguntas", component: Preguntas },
  { id: "likes", label: "Likes", component: Likes },
  { id: "guardados", label: "Guardados", component: Guardados },
];

export default function UserTabs() {
  const [activeTab, setActiveTab] = useState("preguntas");

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <div className="bg-white w-full">
      <div className="flex justify-between px-4 border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 text-center mx-2 ${
              activeTab === tab.id
                ? "border-b-2 border-green text-green font-semibold"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4">{ActiveComponent && <ActiveComponent />}</div>
    </div>
  );
}
