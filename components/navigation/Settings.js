"use client";
import { useState } from "react";

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
        onClick={toggleDropdown}
      >
        User Settings
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-black border rounded shadow-lg">
          <ul>
            <li className="py-2 px-4 hover:bg-slate-800 cursor-pointer">
              Account Settings
            </li>
            <li className="py-2 px-4 hover:bg-slate-800 cursor-pointer">
              Dashboards
            </li>
            <li className="py-2 px-4 hover:bg-slate-800 cursor-pointer">
              Favourites
            </li>
            <li className="py-2 px-4 hover:bg-slate-800 cursor-pointer">
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
