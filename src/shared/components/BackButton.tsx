"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
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
