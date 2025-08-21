import SidebarHeader from "@/components/layout/sidebar/sidebar-header";
import SidebarActions from "./sidebar-actions";

export default function Sidebar({
  mobile = false,
  onClose,
}: {
  mobile?: boolean;
  onClose?: () => void;
}) {
  return (
    <>
      <SidebarHeader onClose={onClose} />
      <SidebarActions onClose={onClose} mobile={mobile} />
    </>
  );
}
