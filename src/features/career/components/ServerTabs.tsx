"use client";
import React, { useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Props {
  tabs: Tab[];
}

interface Tab {
  text: string;
  path: string;
}

export const ServerTabs = ({ tabs }: Props) => {
  const currentPath = usePathname();
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const handleTabClick = useCallback((index: number) => {
    const tab = tabRefs.current[index];
    if (tab) {
      tab.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, []);

  return (
    <Tabs value={currentPath} className="w-full ">
      <ScrollArea className="w-full">
        <TabsList className="flex w-full py-6 bg-gray-100">
          {tabs.map((tab, index) => {
            const isActive = currentPath === tab.path;

            return (
              <TabsTrigger
                key={tab.path}
                value={tab.path}
                className={`shadwon-none flex-1 text-center px-3 text-md ${
                  isActive
                    ? "bg-white border text-black py-2"
                    : "text-gray-600 "
                }`}
                asChild
              >
                <Link
                  href={tab.path}
                  scroll={false}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  onClick={() => handleTabClick(index)}
                >
                  {tab.text}
                </Link>
              </TabsTrigger>
            );
          })}
        </TabsList>
        <ScrollBar orientation="horizontal" transparentThumb />
      </ScrollArea>
    </Tabs>
  );
};

export default ServerTabs;
