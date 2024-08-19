import React from 'react'

interface Props {
  careerName: string;
  facultyName: string
}

export const CareerTitle = ({ careerName, facultyName }: Props) => {
  return (
    <div className="mt-4 mb-4 text-left text-xl font-semibold text-gray-800">
      {careerName}
      <div className="text-green font-semibold text-base">
        {facultyName}
      </div>
    </div>
  )
}
