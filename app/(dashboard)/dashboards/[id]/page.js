import Dashboard from "@/components/dashboard/Dashboard"
import getDashboard from "./getDashboard"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Page({ params }) {
    const supabase = createServerComponentClient({cookies})
    const { data: { user }} = await supabase.auth.getUser()

    if(!user) redirect("/sign-in")

    const dashboardId = params.id 

    const dashboardMetadata = await getDashboard(dashboardId)

    return <Dashboard metadata={dashboardMetadata[0]}/>
}