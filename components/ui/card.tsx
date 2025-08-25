"use client";

import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

function Card({ children }: CardProps) {
  return (
    <div
      className={`bg-primary flex flex-col gap-4 rounded-xl p-4 text-white shadow-md lg:p-8`}
    >
      {children}
    </div>
  );
}

interface SectionProps {
  children: ReactNode;
}

Card.Header = function CardHeader({ children }: SectionProps) {
  return <div>{children}</div>;
};

Card.Content = function CardContent({ children }: SectionProps) {
  return <div>{children}</div>;
};

Card.Footer = function CardFooter({ children }: SectionProps) {
  return <div>{children}</div>;
};

export default Card;
