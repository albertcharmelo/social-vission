import { DashboardProvider } from "@/components/dashboard/dashboard-context";
import { ClientSidebar } from "@/components/dashboard/client-sidebar";
import { ClientTopbar } from "@/components/dashboard/client-topbar";

export const metadata = {
  title: "Mi cuenta | Social Vission",
  description: "Panel de control del cliente",
};

export default function ClienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <div className="flex min-h-screen bg-cloud">
        <ClientSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <ClientTopbar />
          <main className="flex-1 p-4 lg:p-8">{children}</main>
        </div>
      </div>
    </DashboardProvider>
  );
}
