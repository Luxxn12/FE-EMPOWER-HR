import MainLayout from "@/components/layouts/main-layout";
import DashboardAdmin from "./admin";
import DashboardEmployee from "./employee";
import { useAuth } from "@/utils/contexts/token";

export default function Dashboard() {
  const { role } = useAuth();
  return (
    <MainLayout title="" description="">
      {role === "admin" ? <DashboardAdmin /> : <DashboardEmployee />}
    </MainLayout>
  );
}
