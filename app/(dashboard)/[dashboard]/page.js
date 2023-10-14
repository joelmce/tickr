import Dashboards from "@/components/dashboard/Dashboards";
import NewDashboard from "@/components/dashboard/NewDashboard";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies  } from "next/headers";

export default async function Page() {

  const supabase = createServerComponentClient({ cookies })

  const { data: { user }} = await supabase.auth.getUser()
  
  const getDashboards = async () => {
      const { data: dashboard, error } = await supabase.from('Dashboards').select()
      if(error) console.log(error)
      return dashboard
  }

  const deleteDashboard = async (e) => {
    const { error } = await supabase.from('Dashboards').delete().eq('id', e.target.id)
    if(error) console.log(error)
  }

  const dashboards = await getDashboards()

  return (
    <>
      <h1 className="text-3xl">Dashboard</h1>
      {dashboards.length >=1 ? <Dashboards dashboards={dashboards}/> : <NewDashboard/>}
    </>
  );
}
