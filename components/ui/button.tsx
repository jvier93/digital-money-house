import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  withArrow?: boolean;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
  variant?: "accent" | "primary" | "light";
};

const sizeClasses = {
  sm: "px-4 py-2 ",
  md: "px-6 py-3 ",
  lg: "px-8 py-4 md:py-8 ",
};

const variantClasses = {
  accent: "bg-accent text-primary ",
  primary: "bg-primary text-white",
  light: "bg-light text-gray-800 ",
};

const Button = ({
  href,
  onClick,
  withArrow,
  children,
  type = "button",
  size = "md",
  variant = "accent",
}: ButtonProps) => {
  const classes = clsx(
    "inline-flex items-center rounded-xl text-btn-2 w-full shadow-md",
    sizeClasses[size],
    variantClasses[variant],
    {
      "justify-between": withArrow,
      "justify-center": !withArrow,
    },
  );

  const content = (
    <>
      <span>{children}</span>
      {withArrow && <ArrowRight className="ml-2 h-4 w-4" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
};

export default Button;
