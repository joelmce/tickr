import NavItem from "./NavItem";
import Settings from "./Settings";

export default function NavBar() {
  return (
    <nav className="flex bg-gray text-white flex font-inter border-b border-slate-600 align-middle">
      <div id="branding" className="px-6 py-2">
        <h3>Ticker</h3>
      </div>
      <NavItem name="Assets" href="/assets" />
      <NavItem name="Dashboards" href="/dashboards" />
      <Settings className="float-right" />
    </nav>
  );
}
