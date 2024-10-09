import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // const session = await auth();
  // if (session?.user) redirect("/");

  return <>
    {children}
    <Toaster />
  </>
}