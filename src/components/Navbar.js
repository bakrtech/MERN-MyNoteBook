import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
const Navbar = () => {
  let location = useLocation();
  // useEffect(() => {
  //   // console.log(location.pathname)
  // }, [location])

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            MyNotebook
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
