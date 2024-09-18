import React from "react";
import { FaUser, FaUniversity, FaHome } from "react-icons/fa";
import { TbMessageChatbotFilled } from "react-icons/tb";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface User {
  username?: string;
}

interface BottomNavigationProps {
  user: User;
}

export default function BottomNavigation({ user }: BottomNavigationProps) {
  const username = user?.username;
  const userUrl = username ? `/user/${username}` : "/profile";

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
      href: userUrl,
      label: "Perfil",
      icon: <FaUser className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />,
    },
  ];

  return (
    <nav className="h-14 pt-1 bg-white border-t border-gray-200">
      <ScrollArea className="w-full h-full">
        <div className="flex justify-center w-full items-center h-full max-w-md mx-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center px-2 sm:px-3 hover:bg-gray-50 group transition-all duration-300 flex-1"
            >
              <div className="text-gray-500 group-hover:text-green transition-colors duration-300">
                {item.icon}
              </div>
              <span className="text-gray-500 text-[10px] sm:text-xs group-hover:text-green transition-colors duration-300 truncate w-full text-center">
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
