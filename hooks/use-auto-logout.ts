"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export function useAutoLogout() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.expires) return;

    const checkExpiration = () => {
      const expiryTime = new Date(session.expires).getTime();
      const currentTime = Date.now();

      // Si la sesión ya expiró, hacer logout inmediatamente
      if (currentTime >= expiryTime) {
        signOut({ callbackUrl: "/signin?expired=true" });
      }
    };

    // Verificar cada minuto si la sesión ha expirado
    const interval = setInterval(checkExpiration, 60000);

    // Verificar inmediatamente al montar el componente
    checkExpiration();

    return () => clearInterval(interval);
  }, [session]);
}
