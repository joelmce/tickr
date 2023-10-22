"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import DashboardItem from "./DashboardItem";

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
      <section className="mt-4 flex flex-col gap-4">
        {dashboards.map((item) => {
          return <DashboardItem key={item.dashboard_id} metadata={item} />;
        })}
      </section>
    </>
  );
}
