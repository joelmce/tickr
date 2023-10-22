import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function getDashboard(id) {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from("Dashboards")
    .select()
    .eq("dashboard_id", id);

  if (error) return error.message;

  return data;
}
