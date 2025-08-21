"use client";
import Sidebar from "@/components/layout/sidebar";
import { useSidebar } from "@/contexts/sidebar-context";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, close } = useSidebar();

  return (
    <div className="flex h-screen">
      <aside className="hidden w-2/12 flex-col bg-gray-900 text-white md:flex">
        <Sidebar />
      </aside>

      <main className="flex-1 overflow-y-auto p-4">{children}</main>

      {/* Drawer mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <aside className="relative z-50 w-full bg-gray-900 text-white">
            <Sidebar mobile onClose={close} />
          </aside>
        </div>
      )}
    </div>
  );
}
