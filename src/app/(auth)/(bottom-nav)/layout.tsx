import React from "react";
import { auth } from "@/auth";
import BottomNavigation from "@/shared/components/BottomNavigation";
import { redirect } from "next/navigation";

export default async function BottomNavLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow overflow-y-auto">
        <div>{children}</div>
      </main>
      <nav className="sticky bottom-0 left-0 right-0 z-40">
        <BottomNavigation user={session.user} />
      </nav>
    </div>
  );
}
