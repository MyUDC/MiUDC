import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import VerticalCareerList from "./VerticalCareerList";
import { Career } from "@/features/career-catalog/types/Career";

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
        <SheetHeader className="pb-4 border-b">
          <SheetTitle className="max-w-2xl text-3xl font-bold text-black tracking-tight leading-none text-left">
            {title}
          </SheetTitle>
        </SheetHeader>
        <div className="p-4 pb-8 overflow-y-auto h-full">
          {careers.length > 0 ? (
            <VerticalCareerList careers={careers} />
          ) : (
            <div className="p-6">
              <h1 className="max-w-2xl mb-4 text-3xl font-extrabold text-black tracking-tight leading-none md:text-4xl xl:text-5xl">
                No hay carreras guardadas
              </h1>
              <p className="max-w-2xl mb-8 mt-1 text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
                Una vez que guardes carreras, se mostrarán aquí.
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
