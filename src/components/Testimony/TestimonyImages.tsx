import {
  RenderSingleImage,
  RenderTwoImages,
  RenderThreeImages,
  RenderMoreThanThreeImages,
} from "./RenderImages";

type TestimonyImagesProps = {
  imageUrls: string[];
};

export default function TestimonyImages({ imageUrls }: TestimonyImagesProps) {
  const numImages = imageUrls.length;

  const imageRenderMap: { [key: number]: React.FC<TestimonyImagesProps> } = {
    1: RenderSingleImage,
    2: RenderTwoImages,
    3: RenderThreeImages,
  };

  const RenderImagesComponent =
    imageRenderMap[numImages] || RenderMoreThanThreeImages;

  return (
    <div className="my-4">
      <RenderImagesComponent imageUrls={imageUrls} />
    </div>
  );
}
