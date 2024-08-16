interface SwitchButtonProps {
  activeIndex: number;
  onToggle: () => void;
  labels: string[];
}

export default function SwitchButton({
  activeIndex,
  onToggle,
  labels, // label names for switch button, only use two, for example: labels={["Foro", "Detalles"]}
}: SwitchButtonProps) {
  return (
    <div
      className="flex items-center w-44 p-1 bg-smoothGreen rounded-full cursor-pointer"
      onClick={onToggle}
    >
      {labels.map((label, index) => (
        <div
          key={index}
          className={`flex justify-center items-center w-1/2 h-8 text-base rounded-full transition-all ${
            activeIndex === index
              ? "bg-white text-black font-semibold"
              : "text-gray-500 font-normal"
          }`}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
