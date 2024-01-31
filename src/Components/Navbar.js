import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/menu">Menu</NavLink>
      <NavLink to="/cart">Cart</NavLink>
    </nav>
  );
}
