"use client";

import { useState } from "react";

import Testimonios from "../views/Testimonios";
import Preguntas from "../views/Preguntas";
import Likes from "../views/Likes";
import Guardados from "../views/Guardados";

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
