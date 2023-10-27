"use client";

import DashboardItem from "./DashboardItem";

export default function Dashboards({ dashboards, user }) {
  return (
    <>
      <section className="mt-4 flex flex-col gap-4">
        {dashboards.map((item) => {
          return <DashboardItem key={item.dashboard_id} metadata={item} user={user}/>;
        })}
      </section>
    </>
  );
}
