"use client";

import { Button } from "@/components/ui/Button";

export default function SignOutButton() {

  const handleSignOut = () => {
    console.log("Signing out...");
    signOut({ redirectTo: "/sign-in" });
  };


  return (
    <Button onClick={handleSignOut} variant="outline" className="w-full">
      <FaSignOutAlt className="mr-2 h-4 w-4" />
      Cerrar sesión
    </Button>
  );
}