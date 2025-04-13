import DashboardContent from "@/components/dashboard/DashboardContent";

export const metadata = {
  title: "Dashboard - Gardenia Marketplace",
  description: "Manage your agricultural business",
};

export default function DashboardPage() {
  return (
    <div className="container py-8"><DashboardContent /></div>
  );
}