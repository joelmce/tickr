import { useContext } from "react";
import NavItem from "./NavItem";
import Settings from "./Settings";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function NavBar({ user }) {
  return (
    <nav className="flex justify-between bg-gray text-white font-inter border-b border-slate-600 align-middle ">
      <div className="flex">
        <div id="branding" className="px-6 py-2">
          <Link href="/">Ticker</Link>
        </div>
        <NavItem name="Assets" href="/assets" />
        <NavItem name="Dashboards" href="/dashboards" />
      </div>
      <div className="flex">
        {user ? 
          <Settings className="float-right" user={user}/> 
        : (
          <>
            <NavItem name="Login" href="/sign-in"/>
            <NavItem name="Signup" href='/sign-up'/>
          </>
        )}
      </div>     
      
    </nav>
  );
}
