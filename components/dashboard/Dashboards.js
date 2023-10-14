'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export default function Dashboards({ dashboards }) {

    const supabase = createClientComponentClient()
    const router = useRouter()

    const deleteDashboard = async (dashboardId) => {
        const { error } = await supabase.from('Dashboards').delete().eq('dashboard_id', dashboardId)
        if(error) console.log(error)

        router.refresh()
    }

    return (
        <>
            {dashboards.map((item) => {
                console.log(item.dashboard_id)
                return (
                    <>
                        <li key={item.dashboard_id}>{item.name}
                            <button className="bg-red-800 p-2" onClick={() => deleteDashboard(item.dashboard_id)}>Delete</button>
                        </li>
                        
                    </>
                )
            })}
        </>
    )
}