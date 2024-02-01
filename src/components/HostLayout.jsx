import { NavLink, Outlet } from "react-router-dom";

export default function HostLayout() {
  const activeNavLinkStyle = {
    textDecoration: "underline",
    color: "#161616",
    fontWeight: "bold",
  };

  return (
    <>
      <nav className="host-nav">
        <NavLink
          to={"."}
          end={true}
          style={({ isActive }) => (isActive ? activeNavLinkStyle : null)}
        >
          Dashboard
        </NavLink>
        <NavLink
          to={"income"}
          style={({ isActive }) => (isActive ? activeNavLinkStyle : null)}
        >
          Income
        </NavLink>
        <NavLink
          to={"vans"}
          style={({ isActive }) => (isActive ? activeNavLinkStyle : null)}
        >
          Vans
        </NavLink>
        <NavLink
          to={"reviews"}
          style={({ isActive }) => (isActive ? activeNavLinkStyle : null)}
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet></Outlet>
    </>
  );
}
