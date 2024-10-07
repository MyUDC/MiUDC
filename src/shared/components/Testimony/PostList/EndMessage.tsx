import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FlagIcon } from "lucide-react";
import { motion } from "framer-motion";

export const EndMessage = () => {
  const smoothScrollToTop = (duration: number) => {
    const start = window.scrollY;
    const startTime =
      "now" in window.performance ? performance.now() : new Date().getTime();
    const scroll = () => {
      const now =
        "now" in window.performance ? performance.now() : new Date().getTime();
      const time = Math.min(1, (now - startTime) / duration);
      window.scrollTo(0, Math.ceil((1 - time) * start));
      if (time < 1) {
        requestAnimationFrame(scroll);
      }
    };
    requestAnimationFrame(scroll);
  };

  const handleScrollToTop = () => {
    smoothScrollToTop(500); // Ajusta la duración según prefieras
  };

  return (
    <div className="flex items-center justify-center min-h-[50vh] bg-background">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <FlagIcon className="w-12 h-12 mx-auto mb-4 text-green" />
            </motion.div>
            ¡Es todo por ahora!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Has llegado al final de la lista. ¡Vuelve pronto para descubrir más!
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="mt-4"
            onClick={handleScrollToTop}
          >
            Volver arriba
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
