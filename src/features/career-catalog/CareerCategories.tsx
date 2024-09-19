import React from "react";
import CategoryCard from "./components/CategoryCard";
import { careerCategories } from "./data/careerCategoriesData";

export default function CareerCategories() {
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {careerCategories.map((category, index) => (
        <CategoryCard
          key={index}
          title={category.title}
          gradient={category.gradient}
          image={category.image}
        />
      ))}
    </div>
  );
}
