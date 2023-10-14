"use client";
import {useEffect, useRef, useState} from "react";
import Link from "next/link";

export default function Settings() {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null)

    useEffect(() => {
        document.addEventListener('mousedown', toggleDropdown)
        return () => {
            document.removeEventListener('mousedown', toggleDropdown)
        }
    })

    const toggleDropdown = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setIsOpen(false)
        } else {
            setIsOpen(true)
        }
    };

    return (
        <div className="relative" ref={ref}>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
                onClick={toggleDropdown}
            >
                User Settings
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 bg-black border rounded shadow-lg z-10">
                    <ul>
                        <Link href="/settings">
                            <li className="py-2 px-4 hover:bg-slate-800 cursor-pointer">
                                Account Settings
                            </li>
                        </Link>
                        <Link href="/dashboards">
                            <li className="py-2 px-4 hover:bg-slate-800 cursor-pointer">
                                Dashboards
                            </li>
                        </Link>
                        <Link href="/favourites">
                            <li className="py-2 px-4 hover:bg-slate-800 cursor-pointer">
                                Favourites
                            </li>
                        </Link>
                        <li className="py-2 px-4 hover:bg-slate-800 cursor-pointer">
                            Logout
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
