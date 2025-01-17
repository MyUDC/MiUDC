"use client";

import { useAuthAlert } from "@/stores/useAuthAlert";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Props {
  /**
   * @param children
   * The children to render if the user is authenticated.
   */
  children: React.ReactNode;
}

/**
 * Wrapper that shows a login modal when the user is not authenticated.
 *
 * @example
 * ```tsx
 * <AuthWrapper>
 *  <Button>Click me</Button>
 * </AuthWrapper>
 * ```
 *
 * @returns
 * the children if the user is authenticated, otherwise a div that opens the login modal when clicked.
 */
export default function AuthWrapper({ children }: Props) {
  const { data: session, status } = useSession();
  const { open } = useAuthAlert();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false);
    }
  }, [status]);

  // Mientras carga, mostramos el contenido sin bloquear
  if (isLoading) {
    return children;
  }

  // Si no hay sesión y ya terminó de cargar, mostramos el bloqueador
  if (!session?.user) {
    return (
      <div onClick={open}>
        <ClickBlocker>{children}</ClickBlocker>
      </div>
    );
  }

  return children;
}

import React from "react";

interface ClickBlockerProps {
  children: React.ReactNode;
  blockClicks?: boolean; // Prop to determine whether to block clicks or not
}

const ClickBlocker: React.FC<ClickBlockerProps> = ({
  children,
  blockClicks = true,
}) => {
  const handleClick = (event: React.MouseEvent) => {
    if (blockClicks) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={clsx("w-full h-full", blockClicks && "pointer-events-none")}
    >
      {children}
    </div>
  );
};
