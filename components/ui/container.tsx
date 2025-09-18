"use client";

import React, { ReactNode } from "react";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";

// Props base
type ListProps = {
  children: ReactNode;
  className?: string;
};

function Container({ children, className }: ListProps) {
  return (
    <div
      className={clsx(className, "rounded-xl bg-white px-4 shadow-md md:px-8")}
    >
      {children}
    </div>
  );
}

type SectionProps = {
  children?: React.ReactNode;
  className?: string;
  showBorder?: boolean; // opcional
};

//Headers
//Header -> for text headers
//CustomHeader -> for custom content headers (e.g., with buttons)

Container.Header = function Header({
  children,
  className,
  showBorder = false,
}: SectionProps) {
  return (
    <div
      className={clsx("py-3", showBorder && "border-light border-b", className)}
    >
      <h3 className="text-primary heading-3">{children}</h3>
    </div>
  );
};

Container.CustomHeader = function CustomHeader({
  children,
  className,
  showBorder = false,
}: SectionProps) {
  return (
    <div
      className={clsx("py-3", showBorder && "border-light border-b", className)}
    >
      {children}
    </div>
  );
};

// Content
Container.Content = function Content({ children, className }: SectionProps) {
  return <div className={clsx("", className)}>{children}</div>;
};

// Item
type ListItemProps = {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  showSeparator?: boolean;
};

Container.Item = function Item({ children, className }: ListItemProps) {
  return (
    <div
      className={clsx(
        "border-light border-r-0 border-b border-l-0 py-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

// Footer
Container.Footer = function ListFooter({ children, className }: SectionProps) {
  return <div className={clsx("text-body-2 py-3", className)}>{children}</div>;
};

type GreenIndicatorProps = {
  className?: string;
};

Container.GreenIndicator = function GreenIndicator({
  className,
}: GreenIndicatorProps) {
  return (
    <div
      className={clsx(
        "bg-accent h-5 w-5 flex-shrink-0 rounded-full",
        className,
      )}
    />
  );
};

type LinkWithArrowProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
};

Container.LinkWithArrow = function LinkWithArrow({
  children,
  href,
  onClick,
  className,
}: LinkWithArrowProps) {
  const content = (
    <div
      className={clsx(
        "text-primary text-btn-1 flex cursor-pointer items-center justify-between",
        className,
      )}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4" />
    </div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return <div onClick={onClick}>{content}</div>;
};

export default Container;
