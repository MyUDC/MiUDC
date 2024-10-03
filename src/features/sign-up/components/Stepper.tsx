import React, {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button"
import {Progress} from "@/components/ui/progress"

export interface Step {
  message: string;
  icon: React.ReactNode;
}

interface Props {
  steps: Step[];
  currentStep: number;
}

const Stepper = ({steps, currentStep}: Props) => {

  useEffect(() => {
    console.log(currentStep)
  }, [currentStep]);

  return (
    <div>
      <Progress value={(currentStep / (steps.length - 1)) * 100} className="w-full"/>
      <div className="mt-4">
        {steps[currentStep].message}
      </div>
    </div>
  )
}

export default Stepper