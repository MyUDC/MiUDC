import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "@react-hook/media-query";

const ImageDots = ({
  count,
  currentIndex,
}: {
  count: number;
  currentIndex: number;
}) => {
  const dots = Array.from({ length: count }, (_, index) => (
    <span
      key={index}
      className={`h-2 w-2 rounded-full inline-block mx-1 ${
        index === currentIndex ? "bg-gray-800" : "bg-gray-400"
      }`}
    />
  ));

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex">
      {dots}
    </div>
  );
};

const ArrowButtons = ({
  handlePrev,
  handleNext,
  isTransitioning,
}: {
  handlePrev: () => void;
  handleNext: () => void;
  isTransitioning: boolean;
}) => {
  return (
    <>
      <button
        className={`absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer ${"hidden sm:flex"}`}
        onClick={handlePrev}
        disabled={isTransitioning}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button
        className={`absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer ${"hidden sm:flex"}`}
        onClick={handleNext}
        disabled={isTransitioning}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </>
  );
};

const TestimonyImages = ({ imageUrls }: { imageUrls: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);

  const handlePrev = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handleDragStart = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    setDragStartX(clientX);
  };

  const handleDragEnd = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (dragStartX !== null) {
      const clientX =
        "touches" in event ? event.changedTouches[0].clientX : event.clientX;
      const deltaX = clientX - dragStartX;
      if (Math.abs(deltaX) > 50) {
        deltaX < 0 ? handleNext() : handlePrev();
      }
      setDragStartX(null);
    }
  };

  const handleAnimationComplete = () => {
    setIsTransitioning(false);
  };

  return (
    <div
      className="relative w-full h-64 overflow-hidden"
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
    >
      <AnimatePresence
        initial={false}
        custom={currentIndex}
        onExitComplete={handleAnimationComplete}
      >
        <motion.img
          key={currentIndex}
          src={imageUrls[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover cursor-grab"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          whileHover={{ scale: 0.95 }}
          whileTap={{ cursor: "grabbing" }}
        />
      </AnimatePresence>
      {imageUrls.length > 1 && (
        <>
          <ArrowButtons
            handlePrev={handlePrev}
            handleNext={handleNext}
            isTransitioning={isTransitioning}
          />
          <ImageDots count={imageUrls.length} currentIndex={currentIndex} />
        </>
      )}
    </div>
  );
};

export default TestimonyImages;
