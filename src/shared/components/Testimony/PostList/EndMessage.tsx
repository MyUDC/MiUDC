import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FlagIcon, HomeIcon } from "lucide-react";
import { motion } from "framer-motion";

export const EndMessage = () => {
  return (
    <div className="flex items-center justify-center min-h-[50vh] p-6 bg-background">
      <Card className="w-full max-w-md">
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
          <Link href="/home" passHref>
            <Button variant="outline" size="lg" className="mt-4">
              <HomeIcon className="w-4 h-4 mr-2" />
              Volver a inicio
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
