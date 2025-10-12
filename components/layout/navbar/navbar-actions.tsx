"use client";

import { Menu } from "lucide-react";
import { useSidebar } from "@/contexts/sidebar-context";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/button";

type NavbarActionsProps = {
  isLoggedIn: boolean;
};

export default function NavbarActions({ isLoggedIn }: NavbarActionsProps) {
  const pathname = usePathname();
  const { toggle } = useSidebar();

  const showSignIn =
    !isLoggedIn && (pathname === "/" || pathname === "/signup");
  const showSignUp = !isLoggedIn;

  return (
    <div className="flex gap-3">
      {isLoggedIn && pathname !== "/" && (
        <button onClick={toggle} className="text-accent md:hidden">
          <Menu className="h-8 w-8" />
        </button>
      )}

      {showSignIn && (
        <Button
          href="/signin"
          variant="outline"
          size="sm"
          fullWidth={false}
          className="border-accent !text-accent !rounded-md border"
        >
          Ingresar
        </Button>
      )}

      {showSignUp && (
        <Button
          href="/signup"
          className="!rounded-md"
          variant="accent"
          size="sm"
          fullWidth={false}
        >
          Crear cuenta
        </Button>
      )}
    </div>
  );
}
