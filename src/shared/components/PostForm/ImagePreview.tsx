type Image = string | ArrayBuffer | null;

interface Props {
  images: Array<Image>;
}

export const ImagePreview = ({ images }: Props) => {

  return (
    <div className="flex border-b border-gray-300 overflow-x-auto px-2 pb-2 gap-2 flex-nowrap custom-scrollbar">
      {images.map((image, index) => (
        <div
          key={index}
          className="h-16 flex-shrink-0 relative"
        >
          <picture>
            <img
              src={image as string}
              alt="image"
              className='h-16 object-contain rounded-md border border-green'
            />
          </picture>
        </div>
      ))}
    </div>
  )
}
