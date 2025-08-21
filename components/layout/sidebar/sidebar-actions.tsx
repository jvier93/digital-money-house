import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

type SidebarActionsProps = {
  mobile?: boolean;
  onClose?: () => void;
};

const SidebarActions = ({ mobile, onClose }: SidebarActionsProps) => {
  const pathname = usePathname();
  const links = [
    { name: "Inicio", href: "/dashboard" },
    { name: "Actividad", href: "/dashboard/activity" },
    { name: "Tu perfil", href: "/dashboard/profile" },
    { name: "Cargar dinero", href: "/dashboard/deposit" },
    { name: "Pagar servicios", href: "/dashboard/payments" },
    { name: "Tarjetas", href: "/dashboard/cards" },
  ];
  return (
    <nav className="bg-accent flex h-full flex-col gap-2 p-4 px-12">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(
            {
              "font-extrabold": pathname === link.href,
            },
            "text-primary btn-4 py-2",
          )}
          onClick={mobile ? onClose : undefined}
        >
          {link.name}
        </Link>
      ))}

      <button
        onClick={() => signOut()}
        className="text-primary/50 btn-4 rounded-lg py-2 text-left"
      >
        Cerrar sesión
      </button>
    </nav>
  );
};

export default SidebarActions;
