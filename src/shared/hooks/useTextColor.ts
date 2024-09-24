// Custom hook to determine text color based on background brightness
import { useState, useEffect } from "react";

export const useTextColor = (imageSrc: string) => {
  const [textColor, setTextColor] = useState("text-white");

  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, img.width, img.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let r,
          g,
          b,
          avgColor = 0;

        for (let i = 0, len = data.length; i < len; i += 4) {
          r = data[i];
          g = data[i + 1];
          b = data[i + 2];

          avgColor += (r + g + b) / 3;
        }

        avgColor = avgColor / (data.length / 4);

        setTextColor(avgColor > 128 ? "text-black" : "text-white");
      }
    };
  }, [imageSrc]);

  return textColor;
};
