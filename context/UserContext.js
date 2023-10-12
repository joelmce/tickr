"use client"

import { createContext } from 'react'

const UserContext = createContext("")

export default function Session({children}) {
    return (
        <UserContext.Provider value={"ad"}>
            {children}
        </UserContext.Provider>
    )
}
