'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";



interface SwitchButtonProps {
  itemLeft: item;
  itemRight: item;
}

interface item {
  label: string,
  path: string,
}

export default function SwitchButton({ itemLeft, itemRight }: SwitchButtonProps) {
  const currentPath = usePathname();

  return (
    <div
      className="flex items-center w-44 p-1 bg-smoothGreen rounded-full cursor-pointer select-none"
    >
      {[itemLeft, itemRight].map((item, index) => {
        const isActive = currentPath === item.path;
        
        return (
          <Link
            key={index}
            href={item.path}
            className={clsx(
              'flex justify-center items-center w-1/2 h-8 text-base rounded-full transition-all',
              {
                'bg-white text-black font-semibold': isActive,
                'text-gray-500 font-normal': !isActive
              }
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </div>
  );
}
