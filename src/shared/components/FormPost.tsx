import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faCamera } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function PostForm() {
  const [postText, setPostText] = useState<string>("");
  const [postTitle, setPostTitle] = useState<string>("");

  function handleTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setPostText(event.target.value);
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPostTitle(event.target.value);
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      <header className="flex justify-between items-center mb-4 border-b border-gray-300 p-2">
        <button className="text-gray-500">Cancelar</button>
        <h2 className="text-lg font-semibold">Post</h2>
        <button className="text-blue-500 font-semibold">Guardar</button>
      </header>
      <input
        value={postTitle}
        onChange={handleTitleChange}
        placeholder="Título"
        className="p-2 focus:outline-none font-bold text-xl text-black"
        autoFocus
      />
      <textarea
        value={postText}
        onChange={handleTextChange}
        placeholder="Comparte tu experiencia"
        className="flex-1 p-2 focus:outline-none resize-none"
      />
      <div className="flex justify-start space-x-4 mt-4 p-4 text-xl text-black">
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
