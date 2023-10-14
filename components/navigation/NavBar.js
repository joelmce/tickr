import { useContext } from "react";
import NavItem from "./NavItem";
import Settings from "./Settings";

export default function NavBar({ user }) {
  return (
    <nav className="flex justify-between bg-gray text-white font-inter border-b border-slate-600 align-middle ">
      <div className="flex">
        <div id="branding" className="px-6 py-2">
          <h3>Ticker</h3>
        </div>
        <NavItem name="Assets" href="/assets" />
        <NavItem name="Dashboards" href="/dashboards" />
      </div>
      <div className="flex">
      {user ? <Settings className="float-right" user={user}/> : ""}
      </div>     
      
    </nav>
  );
}
