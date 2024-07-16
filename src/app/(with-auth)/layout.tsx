import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function ProtectedRoutesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  console.log(session);
  if (!session?.user) redirect("/sign-in");

  return <>{children}</>;
}