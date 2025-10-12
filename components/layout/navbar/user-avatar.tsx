import React from "react";
import Link from "next/link";

type UserAvatarProps = {
  firstName: string;
  lastName: string;
};

const getInitials = (firstName: string, lastName: string) =>
  `${firstName?.charAt(0).toUpperCase() ?? ""}${lastName?.charAt(0).toUpperCase() ?? ""}`;

const UserAvatar = ({ firstName, lastName }: UserAvatarProps) => {
  const initials = getInitials(firstName, lastName);

  return (
    <Link
      href="/dashboard"
      className="heading-3 flex cursor-pointer items-center gap-2"
    >
      <div className="bg-accent text-primary flex items-center justify-center rounded-xl px-2 py-1 font-bold">
        {initials}
      </div>
      <span className="text-light hidden lg:inline">
        Hola, {firstName} {lastName}
      </span>
    </Link>
  );
};

export default UserAvatar;
