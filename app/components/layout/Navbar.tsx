import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-primary px-8 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/images/logo.svg"
          alt="DMH Logo"
          width={90}
          height={40}
          priority
          className="h-10 w-auto"
        />
      </Link>
      {/* Buttons */}
      <div className="flex gap-3">
        <Link
          href="/login"
          className="px-6 py-2 rounded bg-transparent border border-accent text-accent font-semibold transition hover:bg-accent hover:text-primary"
        >
          Ingresar
        </Link>
        <Link
          href="/register"
          className="px-6 py-2 rounded bg-accent text-primary font-bold transition hover:bg-accent/90"
        >
          Crear cuenta
        </Link>
      </div>
    </nav>
  );
}
