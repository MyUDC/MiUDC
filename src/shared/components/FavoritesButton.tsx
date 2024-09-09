import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

export default function FavoritesButton() {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div>
      <button
        className={`rounded-full ${
          isFavorited ? "text-green" : "text-gray-500"
        }`}
        onClick={() => setIsFavorited(!isFavorited)}
      >
        <FontAwesomeIcon icon={faBookmark} className="w-6 h-6" />
      </button>
    </div>
  );
}
