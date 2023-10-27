import Dashboards from "@/components/dashboard/Dashboards";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabase } from "@/supabase/supabaseClient";

export default async function Page() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }
  const getDashboards = async () => {
    const { data: dashboard, error } = await supabase
      .from("Dashboards")
      .select();
    if (error) console.log(error);
    return dashboard;
  };

  const deleteDashboard = async (e) => {
    const { error } = await supabase
      .from("Dashboards")
      .delete()
      .eq("id", e.target.id);
    if (error) console.log(error);
  };

  const dashboards = await getDashboards();

  return (
    <>
      <h1 className="text-3xl">Your Dashboards</h1>
      <a href="/dashboards/new" className="bg-green-700 p-2 my-4 rounded">
        New Dashboard
      </a>
      {dashboards.length >= 1 ? <Dashboards dashboards={dashboards} /> : null}
    </>
  );
}
