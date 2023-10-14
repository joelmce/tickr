'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export default async function NewDashboard() {
    const supabase = createClientComponentClient()
    const router = useRouter()

    const handleNewDashboard = async () => {
        const { error } = await supabase
            .from('Dashboards')
            .insert({  name: 'Test Dashboard', description: 'Test description' }, { returning: "minimal" })
  
        if(error) console.log(error)

        router.refresh()
    }

    return (
        <button className="bg-green-800 p-2 rounded" onClick={handleNewDashboard}>New Dashboard</button>
    )
}