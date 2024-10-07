import React from "react";

interface Props {
  careerName: string;
  facultyName: string;
}

export const CareerTitle = ({ careerName, facultyName }: Props) => {
  return (
    <div className="p-4 max-w-2xl text-3xl font-bold text-black tracking-tight leading-none text-left">
      {careerName}
      <div className="text-green max-w-2xl text-lg uppercase">
        {facultyName}
      </div>
    </div>
  );
};

//max-w-2xl text-3xl font-bold text-black tracking-tight leading-none text-left
