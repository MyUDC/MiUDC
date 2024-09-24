"use client";
import React from "react";
import { FaUser, FaUniversity, FaHome } from "react-icons/fa";
import { TbMessageChatbotFilled } from "react-icons/tb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface User {
  username?: string;
}

interface BottomNavigationProps {
  user: User;
}

export default function BottomNavigation({ user }: BottomNavigationProps) {
  const pathname = usePathname();
  const username = user?.username;

  const navItems = [
    {
      href: "/home",
      label: "Home",
      icon: <FaHome className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />,
    },
    {
      href: "",
      label: "ChatBot",
      icon: <TbMessageChatbotFilled className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />,
    },
    {
      href: "/career-catalog",
      label: "Carreras",
      icon: <FaUniversity className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />,
    },
    {
      href: `/user/${username}/testimonies`,
      label: "Perfil",
      icon: <FaUser className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />,
      isActive: (path: string) => path.startsWith("/user"),
    },
  ];

  const smoothScrollToTop = (duration: number) => {
    const start = window.scrollY;
    const startTime =
      "now" in window.performance ? performance.now() : new Date().getTime();
    const scroll = () => {
      const now =
        "now" in window.performance ? performance.now() : new Date().getTime();
      const time = Math.min(1, (now - startTime) / duration);
      window.scrollTo(0, Math.ceil((1 - time) * start));
      if (time < 1) {
        requestAnimationFrame(scroll);
      }
    };
    requestAnimationFrame(scroll);
  };

  const handleLinkClick = (href: string) => {
    if (href === pathname) {
      smoothScrollToTop(200);
    }
  };

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.isActive) {
      return item.isActive(pathname);
    }
    return pathname === item.href;
  };

  return (
    <nav className="h-14 pt-1 bg-white border-t border-gray-200">
      <ScrollArea className="w-full h-full">
        <div className="flex justify-center w-full items-center h-full max-w-md mx-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => handleLinkClick(item.href)}
              className={`flex flex-col items-center justify-center px-2 sm:px-3 hover:bg-gray-50 group transition-all duration-100 flex-1 ${
                isActive(item) ? "text-green" : "text-gray-500"
              }`}
            >
              <div
                className={`group-hover:text-green transition-colors duration-100`}
              >
                {item.icon}
              </div>
              <span
                className={`text-[10px] sm:text-xs transition-colors duration-100 truncate w-full text-center ${
                  isActive(item) ? "text-green" : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </nav>
  );
}
