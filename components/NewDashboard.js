'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default async function NewDashboard() {
    const supabase = createClientComponentClient()

    const handleNewDashboard = async () => {
        const { error } = await supabase
            .from('Dashboards')
            .insert({  name: 'Test Dashboard', description: 'Test description' }, { returning: "minimal" })
  
        if(error) console.log(error)
    }

    return (
        <button onClick={handleNewDashboard}>New Dashboard</button>
    )
}