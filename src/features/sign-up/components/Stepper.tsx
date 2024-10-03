import { Progress } from "@/components/ui/progress"

interface Props {
  currentStep: number;
  totalSteps: number;
}

const Stepper = ({ totalSteps, currentStep }: Props) => {
  return (
    <div>
      <Progress value={(currentStep / (totalSteps - 1)) * 100} className="w-full" />
    </div>
  )
}

export default Stepper