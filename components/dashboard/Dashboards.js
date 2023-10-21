"use client";

import { Stack } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import DashboardItem from "./DashboardItem";
import NewDashboard from "./NewDashboard";

export default function Dashboards({ dashboards }) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const deleteDashboard = async (dashboardId) => {
    const { error } = await supabase
      .from("Dashboards")
      .delete()
      .eq("dashboard_id", dashboardId);
    if (error) console.log(error);

    router.refresh();
  };

  return (
    <>
      <section>
        {dashboards.map((item) => {
          return <DashboardItem key={item.dashboard_id} metadata={item} />;
        })}
      </section>
    </>
  );
}
