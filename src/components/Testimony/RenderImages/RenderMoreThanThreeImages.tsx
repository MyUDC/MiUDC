import Image from "next/image";
import RenderImagesProps from "./interfaces/RenderImagesProps";

export default function RenderMoreThanThreeImages({
  imageUrls,
}: RenderImagesProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {imageUrls.length === 4 ? (
        imageUrls.map((imageUrl, index) => (
          <div
            key={index}
            className=" shadow-md flex justify-center items-center rounded-md"
          >
            <div className="w-full h-[150px] relative bg-gray-100">
              <Image
                src={imageUrl}
                alt={`Testimony ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          </div>
        ))
      ) : (
        <>
          {imageUrls.slice(0, 3).map((imageUrl, index) => (
            <div
              key={index}
              className=" shadow-md flex justify-center items-center rounded-md"
            >
              <div className="w-full h-[150px] relative bg-gray-100">
                <Image
                  src={imageUrl}
                  alt={`Testimony ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            </div>
          ))}
          <div className="relative shadow-md flex justify-center items-center rounded-md overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
            <Image
              src={imageUrls[3]}
              alt="Testimony 4"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
            <div className="absolute inset-0 flex justify-center items-center">
              <p className="text-white text-xl font-semibold">Ver más</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
