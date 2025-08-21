"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useSidebar } from "@/contexts/sidebar-context";
import { usePathname } from "next/navigation";

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
          <Menu className="h-6 w-6" />
        </button>
      )}

      {showSignIn && (
        <Link
          href="/signin"
          className="bg-primary text-btn-1 border-accent text-accent rounded border px-6 py-2 font-bold"
        >
          Ingresar
        </Link>
      )}

      {showSignUp && (
        <Link
          href="/signup"
          className="bg-accent text-btn-1 rounded px-6 py-2 font-bold"
        >
          Crear cuenta
        </Link>
      )}
    </div>
  );
}
