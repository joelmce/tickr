"use client";

import DashboardItem from "./DashboardItem";
import FavouritesDash from "@/components/dashboard/FavouritesDash"

let favourites = [];

export default function Dashboards({ dashboards }) {
  return (
    <>
      <section className="mt-4 flex flex-col gap-4">
        {dashboards.map((item) => {
          return <DashboardItem key={item.dashboard_id} metadata={item}/>;
        })}
      </section>
      <section>
        <FavouritesDash favourites={favourites} />
      </section>
    </>
  );
}

