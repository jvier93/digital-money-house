import React from "react";
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
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
  );
};

export default Logo;
