import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AddButton() {
  return (
    <button className="z-40 fixed bottom-6 right-6 bg-green bg-opacity-90 text-white p-4 rounded-full shadow-lg">
      <FontAwesomeIcon icon={faPlus} className="w-8 h-8 text-white" />
    </button>
  );
}
