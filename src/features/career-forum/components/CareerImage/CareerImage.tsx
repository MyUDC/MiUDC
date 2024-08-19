"use client"

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ImageView from "@/shared/components/ImageView";

type CareerImageProps = {
  src: string;
  onClick?: () => void;
  onClose?: () => void; // Añadir una propiedad para el cierre
};

export default function CareerImage({
  src,
  onClick,
  onClose,
}: CareerImageProps) {
  const [showImageView, setShowImageView] = useState(false);

  return (
    <>
      <div
        className="relative w-full h-48 overflow-hidden rounded-t-lg cursor-pointer select-none"
        onClick={() => setShowImageView(true)}
      >
        <Image
          src={src}
          alt="Imagen de la Carrera"
          objectFit="cover"
          className="max-w-full max-h-full object-cover"
          layout="fill"
          draggable="false"
        />

        
        {/* todo: remover el botón de aquí, no es responsabilidad de la imagen mostrarlo */}
        {/* Botón de cierre */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Evita que el clic cierre el contenedor
            setShowImageView(false); // Llama a la función de cierre si está definida
          }}
          className="absolute top-4 left-4 bg-gray-800 bg-opacity-70 rounded-full p-2 px-3 hover:opacity-75 z-10"
          title="Cerrar"
        >
          <FontAwesomeIcon icon={faTimes} className="text-white text-xl" />
        </button>

        {/* todo: remover el botón de aquí, no es responsabilidad de la imagen mostrarlo */}
        {/* Botón de opciones */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Evita que el clic cierre el contenedor
            setShowImageView(false); // Llama a la función de cierre si está definida
          }}
          className="absolute top-4 right-4 bg-gray-800 bg-opacity-70 rounded-full p-2 px-3 hover:opacity-75 z-10"
          title="Opciones"
        >
          <FontAwesomeIcon icon={faEllipsisH} className="text-white text-xl" />
        </button>
      </div>
      {showImageView && (
        <ImageView
          imageUrls={["/telematica.jpg"]}
          initialIndex={0}
          onClose={() => setShowImageView(false)}
        />
      )}
    </>
  );
}
