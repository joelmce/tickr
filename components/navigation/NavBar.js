"use client";

import { useContext } from "react";
import NavItem from "./NavItem";
import Settings from "./Settings";
import Session, { AuthContext } from "@/context/AuthProvider";
import Logout from "../auth/Logout";
import AuthProvider from "@/context/AuthProvider";

export default function NavBar({ user }) {
  const session = useContext(AuthContext);

  return (
    <nav className="flex bg-gray text-white flex font-inter border-b border-slate-600 align-middle ">
      <div id="branding" className="px-6 py-2">
        <h3>Ticker</h3>
        {session?.user ? (
          <div>
            <p>{session.user.email}</p>
            <Logout />
          </div>
        ) : (
          "Login"
        )}
      </div>
      <NavItem name="Assets" href="/assets" />
      <NavItem name="Dashboards" href="/dashboards" />
      <Settings className="float-right" />
    </nav>
  );
}
