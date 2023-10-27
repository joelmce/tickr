import AddToFavourite from "./AddToFavourite";
import { EditableField } from "../ui/EditableField";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function DashboardHeader({ metadata, user }) {
    const supabase = createClientComponentClient()

    const handleSave = async(name, content) => {
        const { error } = await supabase.from("Dashboards").update({ [name]: content }).eq('dashboard_id', metadata.dashboard_id)
        if(error) console.error(error)
    }

    return (
        <>
            {user.id == metadata.id ? 
                <>
                    <EditableField value={metadata.name.toUpperCase()} classes="w-fit pl-1 mb-2 font-extrabold text-6xl" name="name" onSave={handleSave}/>
                    <EditableField value={metadata.description} classes="block my-4 text-xl w-auto" name="description" onSave={handleSave}/>
                </>
            : 
            <>
                <h1 className="w-fit pl-1 mb-2 font-extrabold text-6xl">{metadata.name.toUpperCase()}</h1>
                <p className="block my-4 text-xl w-auto">{metadata.description}</p>
            </>}
            <span className="p-2 bg-gray text-slate-400 rounded">@{metadata.creator}</span>
            <AddToFavourite />
        </>
    )
}