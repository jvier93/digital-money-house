"use client";

import clsx from "clsx";
import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        className,
        `bg-primary flex flex-col gap-4 rounded-xl p-4 text-white shadow-md md:p-8 lg:p-10`,
      )}
    >
      {children}
    </div>
  );
}

interface SectionProps {
  children: ReactNode;
  className?: string;
}

Card.Header = function CardHeader({ children, className }: SectionProps) {
  return <div className={className}>{children}</div>;
};
Card.Content = function CardContent({ children, className }: SectionProps) {
  return <div className={className}>{children}</div>;
};
Card.Footer = function CardFooter({ children, className }: SectionProps) {
  return <div className={className}>{children}</div>;
};
export default Card;
