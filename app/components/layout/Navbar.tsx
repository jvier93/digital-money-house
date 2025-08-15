import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-primary p-4 flex items-center justify-between">
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
      {/* Buttons */}
      <div className="flex gap-3">
        <Link
          href="/login"
          className="px-6 py-2 rounded bg-primary text-btn-1 font-bold border border-accent text-accent  "
        >
          Ingresar
        </Link>
        <Link
          href="/register"
          className="px-6 py-2 rounded bg-accent text-btn-1 font-bold "
        >
          Crear cuenta
        </Link>
      </div>
    </nav>
  );
}
