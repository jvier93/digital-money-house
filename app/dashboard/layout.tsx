"use client";
import Sidebar from "@/components/layout/sidebar";
import { useSidebar } from "@/contexts/sidebar-context";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, close } = useSidebar();

  return (
    <div className="flex flex-1">
      <aside className="hidden w-3/12 flex-col bg-gray-900 text-white md:flex lg:w-2/12">
        <Sidebar />
      </aside>

      {children}

      {/* Drawer mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <aside className="relative z-50 w-full bg-gray-900 text-white">
            <Sidebar mobile onClose={close} />
          </aside>
        </div>
      )}
      <Toaster richColors position="bottom-right" />
    </div>
  );
}
