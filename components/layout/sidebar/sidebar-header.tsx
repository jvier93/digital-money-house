import React from "react";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";

type SidebarHeaderProps = {
  onClose?: () => void;
};

const SidebarHeader = ({ onClose }: SidebarHeaderProps) => {
  const { data: session } = useSession();
  return (
    <header className="bg-primary flex h-40 w-full flex-col justify-between md:hidden">
      <div className="flex justify-end pt-5 pr-4">
        <button onClick={onClose} className="" aria-label="Cerrar">
          <X className="text-accent h-6 w-6" />
        </button>
      </div>

      <div className="text-accent heading-3 px-12 pb-6">
        <h2>Hola,</h2>
        <p>
          {session?.user.firstName} {session?.user.lastName}
        </p>
      </div>
    </header>
  );
};

export default SidebarHeader;
