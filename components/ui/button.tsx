import React from "react";
import Link from "next/link";
import clsx from "clsx";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "accent" | "primary" | "light" | "outline" | "gray";
  fullWidth?: boolean;
  className?: string;
};

const sizeClasses = {
  sm: "px-4 py-2 text-btn-1",
  md: "px-6 py-3 text-btn-2",
  lg: "px-4 md:px-8 py-4 md:py-8 text-btn-2",
  xl: "px-0 py-4 heading-2",
};

const variantClasses = {
  accent: "bg-accent text-primary",
  primary: "bg-primary text-white",
  light: "bg-light text-primary",
  outline: "text-primary text-btn-3  no-underline shadow-none",
  gray: "bg-gray text-primary",
};

const Button = ({
  href,
  onClick,
  icon,
  children,
  type = "button",
  size = "md",
  variant = "accent",
  fullWidth = true,
  className,
}: ButtonProps) => {
  const classes = clsx(
    "inline-flex items-center justify-center cursor-pointer rounded-xl shadow-md gap-2",
    sizeClasses[size],
    variantClasses[variant],
    fullWidth ? "w-full" : "w-fit",
    className,
  );

  const content = (
    <>
      {children}
      {icon}
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
