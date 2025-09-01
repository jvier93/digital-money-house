import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type CurrentPageBreadcrumbProps = {
  currentPageTitle: string;
  href: string;
};

const CurrentPageBreadcrumb = ({
  currentPageTitle,
  href,
}: CurrentPageBreadcrumbProps) => {
  return (
    <Link href={href} className="text-btn-3 block md:hidden">
      <div className="flex items-center gap-2">
        <ArrowRight />
        <span className="text-btn-3"> {currentPageTitle}</span>
      </div>
    </Link>
  );
};

export default CurrentPageBreadcrumb;
