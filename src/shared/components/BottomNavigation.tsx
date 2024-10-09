"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";

import clsx from "clsx";
import { FaUser, FaUniversity, FaHome } from "react-icons/fa";
import { TbMessageChatbotFilled } from "react-icons/tb";

import { useAuthAlert } from "@/stores/useAuthAlert";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { User } from "@prisma/client";
import AuthWrapper from "@/features/auth/components/AuthWrapper";


interface NavItem {
  needAuth?: boolean;
  href: string;
  label: string;
  icon: React.ReactNode;
  isActive?: (path: string) => boolean;
}

export default function BottomNavigation() {
  // ----[Instances and Hooks]----
  const pathname = usePathname();
  const { data: session } = useSession();
  const [user, setUser] = useState(session?.user);

  // ----[Effects]----
  useEffect(() => {
    setUser(session?.user);
  }, [session]);


  // ----[Memoized Variables]----
  const navItems = useMemo(() => ([
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
      href: `/user/${user?.username}/testimonies`,
      label: "Perfil",
      icon: <FaUser className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />,
      needAuth: true,
    },
  ]), [user?.username]);


  // ----[Functions]----
  // if the current path is the same as the href, scroll to top
  const handleLinkClick = (href: string,) => {
    if (href === pathname) {
      smoothScrollToTop(200);
    }
  };

  // Check if the current path is active
  const isActive = (item: NavItem) => {
    if (item.isActive) {
      return item.isActive(pathname);
    }
    return pathname === item.href;
  };


  // ----[Render]----
  return (
    <nav className="h-14 pt-1 bg-white border-t border-gray-200">
      <ScrollArea className="w-full h-full">
        <div className="flex justify-center w-full items-center h-full max-w-md mx-auto">
          {navItems.map((item) => (
            <>
              {item.needAuth
                ? (
                  <AuthWrapper key={item.href}>
                    <NavButton
                      key={item.href}
                      icon={item.icon}
                      label={item.label}
                      isActive={isActive(item)}
                      href={item.href}
                      needAuth={item.needAuth}
                    />
                  </AuthWrapper>
                )
                : (<NavButton
                  key={item.href}
                  icon={item.icon}
                  label={item.label}
                  isActive={isActive(item)}
                  href={item.href}
                />)
              }
            </>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </nav>
  );
}

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  href: string;
  needAuth?: boolean;
  user?: User;
}

function NavButton({
  icon,
  label,
  isActive,
  href,
  needAuth,
  user
}: NavButtonProps) {
  // ----[Instances and Hooks]----
  const router = useRouter();

  // ----[Functions]----
  const clickHandler = () => {
    if (isActive) {
      smoothScrollToTop(200);
      return;
    }
    router.push(href);
  }

  // ----[Render]----
  return (
    <button
      type="button"
      onClick={clickHandler}
      className={clsx(
        "flex flex-col text-gray-500 items-center justify-center px-2 sm:px-3 hover:bg-gray-50 group transition-all duration-100 flex-1",
        { "text-green": isActive }
      )}
    >
      <div className={`group-hover:text-green transition-colors duration-100`}>
        {icon}
      </div>
      <span className={`text-[10px] sm:text-xs transition-colors duration-100 truncate w-full text-center ${isActive ? "text-green" : "text-gray-500"}`}>
        {label}
      </span>
    </button>
  );
}


// ----[Utils]----
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
