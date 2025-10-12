import { auth } from "@/auth";
import NavbarActions from "./navbar-actions";
import Logo from "@/components/layout/navbar/Logo";
import UserAvatar from "./user-avatar";
import Button from "@/components/ui/button";

export default async function Navbar() {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  return (
    <nav className="bg-primary flex w-full items-center justify-between p-4">
      <Logo />
      <div className="flex gap-2">
        {session?.user && (
          <>
            <Button
              href="/dashboard"
              variant="light"
              size="sm"
              fullWidth={false}
            >
              Dashboard
            </Button>
            <UserAvatar
              firstName={session.user.firstName}
              lastName={session.user.lastName}
            />
          </>
        )}
        <NavbarActions isLoggedIn={isLoggedIn} />
      </div>
    </nav>
  );
}
