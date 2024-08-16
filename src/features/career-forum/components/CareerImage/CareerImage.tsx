import Image from "next/image";

type CareerImageProps = {
  src: string;
};

export default function CareerImage({ src }: CareerImageProps) {
  return (
    <div className="relative w-full h-48 rounded-lg overflow-hidden">
      <Image
        src={src}
        alt="Imagen de la Carrera"
        objectFit="cover"
        className="max-w-full max-h-full object-contain"
        layout="fill"
      />
    </div>
  );
}
