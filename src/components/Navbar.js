import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="/">
            CRUD
          </a>
          <button
            className="navbar-toggler text-light"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-link ms-3 text-white" to="/home" activeStyle={{ color: "white", borderBottom: "1px solid white" }}>
                Home
              </NavLink>
              <NavLink className="nav-link ms-3 text-white" to="/posts" activeStyle={{ color: "white", borderBottom: "1px solid white" }}>
                Posts
              </NavLink>
              <NavLink className="nav-link ms-3 text-white" to="/about" activeStyle={{ color: "white", borderBottom: "1px solid white" }}>
                About
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
