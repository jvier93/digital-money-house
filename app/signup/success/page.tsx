import React from "react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <main className="bg-primary flex flex-1 flex-col items-center justify-center gap-8">
      <h1 className="heading-1 text-center text-4xl text-white xl:text-7xl">
        Registro Exitoso
      </h1>
      <Image
        src="/images/signup/success-check.svg"
        alt="Éxito"
        width={50}
        height={50}
        className="mb-4 h-20 w-20"
      />
      <Link
        href="/"
        type="submit"
        className="text-primary text-btn-2 bg-accent block w-80 rounded-lg px-6 py-3 text-center"
      >
        Continuar
      </Link>
    </main>
  );
};

export default page;
