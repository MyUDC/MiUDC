import { auth } from "@/auth";
import { AppBar } from "@/shared/components/AppBar";
import BottomNavigation from "@/shared/components/BottomNavigation";
import { redirect } from "next/navigation";

export default async function AppBarLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow pb-16">{children}</div>
      <BottomNavigation user={session.user} />
    </div>
  );
}
