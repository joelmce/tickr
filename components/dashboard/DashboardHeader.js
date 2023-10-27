
import AddToFavourite from "./AddToFavourite";
import { EditableField } from "../ui/EditableField";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function DashboardHeader({ metadata }) {
    const supabase = createClientComponentClient()
    const handleSave = async(name, content) => {
        const { error } = await supabase.from("Dashboards").update({ [name]: content }).eq('dashboard_id', metadata.dashboard_id)
        if(error) console.error(error)
    }

    return (
        <>
            <EditableField value={metadata.name.toUpperCase()} classes="w-fit pl-1 mb-2 font-extrabold text-6xl" name="name" onSave={handleSave}/>
            <EditableField value={metadata.description} classes="block my-4 text-xl w-auto" name="description" onSave={handleSave}/>
            <span className="p-2 bg-gray text-slate-400 rounded">@{metadata.creator}</span>
            <AddToFavourite />
        </>
    )
}