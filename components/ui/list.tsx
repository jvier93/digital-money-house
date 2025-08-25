"use client";

import React, { ReactNode } from "react";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";

// Props base
type ListProps = {
  children: ReactNode;
  className?: string;
};

function List({ children, className }: ListProps) {
  return (
    <div className={clsx("rounded-xl bg-white px-8 shadow-md", className)}>
      {children}
    </div>
  );
}

type SectionProps = {
  children: ReactNode;
  className?: string;
};

// Header
List.Header = function ListHeader({ children, className }: SectionProps) {
  return (
    <div
      className={clsx(
        "border-light border-r-0 border-b border-l-0 py-3",
        className,
      )}
    >
      <h3 className="text-primary heading-3">{children}</h3>
    </div>
  );
};

// Content
List.Content = function ListContent({ children, className }: SectionProps) {
  return <div className={clsx("", className)}>{children}</div>;
};

// Item
type ListItemProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  showSeparator?: boolean;
};

List.Item = function ListItem({ children }: ListItemProps) {
  return (
    <div
      className={clsx(
        "border-light border-r-0 border-b border-l-0 py-3 transition-colors",
      )}
    >
      {children}
    </div>
  );
};

// Footer
List.Footer = function ListFooter({ children, className }: SectionProps) {
  return <div className={clsx("py-3", className)}>{children}</div>;
};

type GreenIndicatorProps = {
  className?: string;
};

List.GreenIndicator = function GreenIndicator({
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

List.LinkWithArrow = function LinkWithArrow({
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

export default List;
