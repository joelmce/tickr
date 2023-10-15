import Dashboard from "@/components/dashboard/Dashboard"
import getDashboard from "./getDashboard"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default async function Page({ params }) {
    const dashboardId = params.id 

    const dashboardMetadata = await getDashboard(dashboardId)

    return <Dashboard metadata={dashboardMetadata[0]}/>
}