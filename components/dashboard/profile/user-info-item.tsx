"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";

export type UserInfoItemType = {
  label: string;
  value: string;
};

const UserInfoItem = ({ label, value }: UserInfoItemType) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast.success("Información copiada");
  };

  return (
    <div className="border-light space-y-2 border-b py-3 md:border-0">
      <div className="heading-2 text-accent flex w-full items-center justify-between">
        <span className="text-muted-foreground text-sm">{label}</span>
        <button onClick={handleCopy}>
          <Copy className="h-5 w-5" />
        </button>
      </div>
      <span className="text-body-1 block">{value}</span>
    </div>
  );
};

export default UserInfoItem;
