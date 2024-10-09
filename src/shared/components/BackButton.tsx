"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

interface Props {
  /**
   * @param path 
   * path to navigate to when the back button is clicked. 
   * If not provided, the back button will navigate to the previous page.
   * 
   * @example
   * path="/home"
   * path="/career/telematica"
   * 
   * @default undefined
   */
  path?: string;
}

export default function BackButton({ path }: Props) {
  const router = useRouter();

  const handleBack = () => {
    if (path) router.push(path);
    else router.back();
  }

  return (
    <Button
      variant="outline"
      className="fixed top-4 left-4 flex items-center z-20"
      onClick={handleBack}
    >
      <IoArrowBack className="text-green h-4 w-4" />
    </Button>
  );
}
