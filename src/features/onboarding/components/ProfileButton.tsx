import { FaUser } from "react-icons/fa";

interface ProfileButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  description: string; // Make description required
}

export default function ProfileButton({
  label,
  isSelected,
  onClick,
  description,
}: ProfileButtonProps) {
  const colors = {
    Estudiante: {
      bgColor: isSelected ? "bg-green" : "bg-smoothGreen",
      iconColor: isSelected ? "text-white" : "text-green",
      textColor: isSelected ? "text-white" : "text-green",
    },
    Aspirante: {
      bgColor: isSelected ? "bg-yellow" : "bg-smoothYellow",
      iconColor: isSelected ? "text-white" : "text-yellow",
      textColor: isSelected ? "text-white" : "text-yellow",
    },
  }[label];

  return (
    <div
      className={`flex flex-col items-center gap-4 font-semibold text-left py-6 px-8 rounded-xl cursor-pointer ${colors?.bgColor} w-full max-w-xs`} // Set max width
      onClick={onClick}
    >
      <FaUser className={`text-8xl ${colors?.iconColor}`} />
      <h2 className={`text-base ${colors?.textColor}`}>{label}</h2>
      <p className={`text-sm ${colors?.textColor}`}>{description}</p>
    </div>
  );
}
