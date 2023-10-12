import { supabase } from '@/supabase/supabaseClient'
import bcrypt from 'bcrypt'

export async function POST(req) {
    const { email, password } = await req.json()
    return Response.json({ response: "Successful", status: 200})
}