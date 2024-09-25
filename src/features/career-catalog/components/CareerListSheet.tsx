import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import VerticalCareerList from "./VerticalCareerList";

type Career = {
  id: string;
  name: string;
  slug: string;
  faculty: string;
};

interface CareerListSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  careers: Career[];
}

export default function CareerListSheet({
  isOpen,
  onClose,
  title,
  careers,
}: CareerListSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-full">
        <SheetHeader>
          <SheetTitle className="max-w-2xl text-3xl font-bold text-black tracking-tight leading-none">
            {title}
          </SheetTitle>
        </SheetHeader>
        <div className="p-4 pb-8 overflow-y-auto h-full">
          <VerticalCareerList careers={careers} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
