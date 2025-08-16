import { logoutAction } from "@/app/actions";
import Image from "next/image";
import Link from "next/link";
interface NavbarProps {
  showSignInButton: boolean;
  isLoggedIn: boolean;
}

export default function Navbar({ showSignInButton, isLoggedIn }: NavbarProps) {
  return (
    <nav className="bg-primary flex w-full items-center justify-between p-4">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/images/logo.svg"
          alt="DMH Logo"
          width={90}
          height={40}
          priority
          className="h-8 w-auto"
        />
      </Link>

      <div className="flex gap-3">
        {isLoggedIn && (
          <button
            onClick={logoutAction}
            className="bg-primary text-btn-1 border-accent text-accent rounded border px-6 py-2 font-bold"
          >
            Cerrar sesión
          </button>
        )}
        {showSignInButton && !isLoggedIn && (
          <Link
            href="/signin"
            className="bg-primary text-btn-1 border-accent text-accent rounded border px-6 py-2 font-bold"
          >
            Ingresar
          </Link>
        )}
        {!isLoggedIn && (
          <Link
            href="/signup"
            className="bg-accent text-btn-1 rounded px-6 py-2 font-bold"
          >
            Crear cuenta
          </Link>
        )}
      </div>
    </nav>
  );
}
