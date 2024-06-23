import Image from "next/image";
import RenderImagesProps from "./interfaces/RenderImagesProps";

export default function RenderSingleImage({ imageUrls }: RenderImagesProps) {
  return (
    <div className="w-full flex justify-center items-center shadow-md rounded-md">
      <div className="w-full h-[150px] relative bg-gray-100">
        <Image
          src={imageUrls[0]}
          alt="Testimony"
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
    </div>
  );
}
