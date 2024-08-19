import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faCamera } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function PostForm() {
  const [postText, setPostText] = useState<string>("");

  function handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setPostText(event.target.value);
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      <header className="flex justify-between items-center mb-4 border-b border-gray-300 p-2">
        <button className="text-gray-500">Cancelar</button>
        <h2 className="text-lg font-semibold">Post</h2>
        <button className="text-blue-500 font-semibold">Guardar</button>
      </header>
      <textarea
        value={postText}
        onChange={handleInputChange}
        placeholder="Comparte tu experiencia"
        className="flex-1 p-2 focus:outline-none resize-none"
      />
      <div className="flex justify-start space-x-4 mt-4 p-4 text-xl text-gray-500">
        <button aria-label="Insert Image">
          <FontAwesomeIcon icon={faImage} />
        </button>
        <button aria-label="Insert Camera">
          <FontAwesomeIcon icon={faCamera} />
        </button>
      </div>
    </div>
  );
}