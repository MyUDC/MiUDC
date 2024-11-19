import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function ChatbotPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white p-4">
      <div className="flex-grow flex flex-col items-center justify-center max-w-2xl mx-auto p-2">
        <h1 className="text-4xl font-extrabold text-black mb-4 tracking-tight leading-none md:text-5xl xl:text-6xl">
          Próximamente: Implementación de{" "}
          <span className="text-green">Chat</span>
          <span className="text-yellow">bot</span> de orientación vocacional
        </h1>
        <p className="mb-8 mt-1 text-black text-lg">
          Estamos trabajando en una herramienta para ayudarte a descubrir tu
          vocación y elegir la carrera que más se adapte a tus interés
        </p>

        <div className="flex justify-start w-full">
          <Link href="/home">
            <Button
              className="bg-green text-white hover:bg-green-600"
              size="lg"
            >
              Volver a Home
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-auto flex justify-center">
        <Image
          src="/loro-chatbot.png"
          alt="Loro Chatbot"
          width={500}
          height={500}
          priority
          className="object-contain max-h-[40vh]"
        />
      </div>
    </div>
  );
}
