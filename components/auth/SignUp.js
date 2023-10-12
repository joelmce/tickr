'use client'

import { supabase } from "@/supabase/supabaseClient"
import { useState } from "react"

export default function SignUp() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const updateEmail = (e) => {
        setEmail(e.target.value)
    }

    const updatePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSignUp = async (e) => {
        e.preventDefault();

        const {data, error} = await supabase.auth.signUp({
            email,
            password
        })

        console.log(data, error)

        console.log('Submitted:', {email, password})
    }



    return (
        <form>
            <label>
                Email
                <input type="email" onChange={updateEmail}/>
            </label>
            <label>
                Password
                <input type="password" onChange={updatePassword}/>
            </label>
            <button onClick={handleSignUp}>Sign Up</button>
        </form>
    )
}