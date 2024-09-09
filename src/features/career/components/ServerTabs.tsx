"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useEffect } from "react";

interface Props {
  tabs: Tab[];
}

interface Tab {
  text: string;
  path: string;
}

export const ServerTabs = ({ tabs }: Props) => {
  const currentPath = usePathname();
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeTab = document.querySelector(".active");
    if (activeTab) {
      const tabsContainer = tabsRef.current;
      if (tabsContainer) {
        const containerWidth = tabsContainer.offsetWidth;
        const activeTabLeft = activeTab.getBoundingClientRect().left;
        const activeTabWidth = activeTab.getBoundingClientRect().width;
        const containerLeft = tabsContainer.getBoundingClientRect().left;

        let scrollPosition =
          activeTabLeft -
          containerLeft -
          containerWidth / 2 +
          activeTabWidth / 2;
        if (scrollPosition < 0) {
          scrollPosition = 0;
        }

        tabsContainer.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [currentPath]);

  return (
    <div
      ref={tabsRef}
      className="flex w-full gap-3 px-2 overflow-x-auto no-scrollbar bg-white border-b-2"
    >
      {tabs.map((item, index) => {
        const isActive = currentPath.includes(item.path);

        return (
          <Link
            key={item.text}
            href={item.path}
            scroll={false}
            className={clsx(
              "text-center flex-1 py-2 border-b-2 transition-all duration-300 text-lg",
              {
                "border-green text-green font-semibold active": isActive,
                "border-transparent text-gray-600 hover:text-green": !isActive,
              }
            )}
          >
            {item.text}
          </Link>
        );
      })}
    </div>
  );
};
