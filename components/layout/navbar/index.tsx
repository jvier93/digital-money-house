import { auth } from "@/auth";
import NavbarActions from "./navbar-actions";
import Logo from "@/components/layout/navbar/Logo";

export default async function Navbar() {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  return (
    <nav className="bg-primary flex w-full items-center justify-between p-4">
      <Logo />

      <NavbarActions isLoggedIn={isLoggedIn} />
    </nav>
  );
}
