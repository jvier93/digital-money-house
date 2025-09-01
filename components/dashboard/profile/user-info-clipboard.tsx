"use client";

import Card from "@/components/ui/card"; // Ajusta si tu Card está en otro path
import UserInfoItem from "./user-info-item";

export type UserInfoClipboardType = {
  cvu: string;
  alias: string;
};

const UserInfoClipboard = ({ cvu, alias }: UserInfoClipboardType) => {
  return (
    <Card>
      <Card.Header>
        Copia tu CVU o Alias para ingresar o transferir dinero desde otra cuenta
      </Card.Header>
      <Card.Content>
        <div className="flex flex-col gap-4">
          <UserInfoItem label="CVU" value={cvu} />
          <UserInfoItem label="Alias" value={alias} />
        </div>
      </Card.Content>
      <Card.Footer> </Card.Footer>
    </Card>
  );
};

export default UserInfoClipboard;
