"use client";

import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
export default function BackButton() {
  return (
    <Link href="/home">
      <Button
        variant="outline"
        className="fixed top-4 left-4 flex items-center z-20"
      >
        <IoArrowBack className="text-green h-4 w-4" />
      </Button>
    </Link>
  );
}
