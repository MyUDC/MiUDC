'use client';

import clsx from "clsx"
import Link from "next/link";
import { usePathname } from "next/navigation"

interface Props {
  tabs: Tab[]
}

interface Tab {
  text: string;
  path: string;
}

export const ForumTabs = ({tabs}: Props) => {
  const currentPath = usePathname();

  return (
    <div className="flex w-full bg-white border-b-2">
      {tabs.map(item => {
        const isActive = currentPath.includes(item.path);
        
        return (
          <Link
            key={item.text}
            href={item.path}
            scroll={false}
            className={clsx('text-center flex-1 py-2 border-b-2 transition-all duration-300 text-lg',
              {
                'border-green text-green font-semibold': isActive,
                'border-transparent text-gray-600 hover:text-green': !isActive
              }
            )}
          >
            {item.text}
          </Link>
        )
      })}
    </div>
  )
}
