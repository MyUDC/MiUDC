import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProtectedRoutesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");
  

  return (
    <div>
      {children}
    </div>
  );
}