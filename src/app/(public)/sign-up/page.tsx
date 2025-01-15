import SignUpSteps from "@/features/sign-up/components/SignUpSteps";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Únete a la comunidad | Registro",
  description: "Regístrate y únete a la comunidad de MiUdc",
}

export default function SignUpPage() {
  return (
    <div className="h-svh bg-gray-50">
      <SignUpSteps />
    </div>
  );
}