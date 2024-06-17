import Image from "next/image";
import RenderImagesProps from "./interfaces/RenderImagesProps";

export default function RenderThreeImages({ imageUrls }: RenderImagesProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className=" shadow-md flex justify-center items-center rounded-md">
        <div className="w-full h-[300px] relative bg-gray-100">
          <Image
            src={imageUrls[0]}
            alt="Testimony 1"
            layout="fill"
            objectFit="contain"
            className="rounded-md"
          />
        </div>
      </div>
      <div className="grid grid-rows-2 gap-2">
        {imageUrls.slice(1).map((imageUrl, index) => (
          <div
            key={index}
            className=" shadow-md flex justify-center items-center rounded-md"
          >
            <div className="w-full h-[150px] relative bg-gray-100">
              <Image
                src={imageUrl}
                alt={`Testimony ${index + 2}`}
                layout="fill"
                objectFit="contain"
                className="rounded-md"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
