import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function getLoggedInUser() {
    const supabase = createClientComponentClient()
    const { data: { user }} = await supabase.auth.getUser()
    return user
}