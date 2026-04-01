import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
      <AdminSidebar />
      <div className="flex-1 p-4 md:p-8">{children}</div>
    </div>
  );
}
