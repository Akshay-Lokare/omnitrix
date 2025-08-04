import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="nav-container">
      <Link className="nav-button" to="/">Omnitrix</Link>
      <Link className="nav-button" to="/af">Omnitrix-AF</Link>
      <Link className="nav-button" to="/ultimatrix">Ultimatrix</Link>
    </div>
  );
}

export default Nav;
