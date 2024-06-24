import { ManyImages, DoubleImages, SingleImages } from "./ImagesLayout";

type TestimonyImagesProps = {
  imageUrls: string[];
};

export default function TestimonyImages({ imageUrls }: TestimonyImagesProps) {
  const componentMap: {
    [key: number]: React.ReactElement;
    default: React.ReactElement;
  } = {
    1: <SingleImages imageUrl={imageUrls[0]} />,
    2: <DoubleImages imageSources={imageUrls} />,
    default: <ManyImages imageSources={imageUrls} />,
  };

  return (
    <div className="mt-4">
      {componentMap[imageUrls.length] || componentMap.default}
    </div>
  );
}
