import React from "react";
import BottomNavigation from "@/shared/components/BottomNavigation";

export default async function BottomNavLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow overflow-y-auto">
        <div>{children}</div>
      </main>
      <nav className="sticky bottom-0 left-0 right-0 z-40">
        <BottomNavigation/>
      </nav>
    </div>
  );
}
