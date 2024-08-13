import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  console.log(session);
  if (session?.user) redirect("/");

  return <>{children}</>
}