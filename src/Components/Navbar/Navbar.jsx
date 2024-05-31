import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { MovieContext } from "../Context/MovieContext";

const Navbar = () => {
  const [menu, setMenu] = useState("popular");
  const [localQuery, setLocalQuery] = useState("");
  const {
    setQuery,
    fetchSearchedMovies,
    fetchSearchedTopRatedMovies,
    fetchSearchedUpcomingMovies,
  } = useContext(MovieContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLocalQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (localQuery.trim() !== "") {
      setQuery(localQuery);
      if (menu === "popular") {
        await fetchSearchedMovies(localQuery, 1);
        navigate(`/`);
      } else if (menu === "toprated") {
        await fetchSearchedTopRatedMovies(localQuery, 1);
        navigate(`/top-rated`);
      } else if (menu === "upcoming") {
        await fetchSearchedUpcomingMovies(localQuery, 1);
        navigate(`/up-coming`);
      }
      setLocalQuery("");
    }
  };

  return (
    // <div className='nav-con'>
    <nav className="navbar  nav-bar-item  navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand text-light fs-1 p-3" href="/">
          MovieDb
        </a>
        <button
          className="navbar-toggler bg-light  border border-primary-subtle rounded-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon "></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav   me-auto mb-2 mb-lg-0">
            <li
              className="nav-item "
              onClick={() => {
                setMenu("popular");
              }}
            >
              <Link className="nav-link text-light" to="/">
                Popular {menu === "popular" ? <hr /> : ""}
              </Link>
            </li>
            <li
              className="nav-item"
              onClick={() => {
                setMenu("toprated");
              }}
            >
              <Link className="nav-link text-light" to="/top-rated">
                Top Rated {menu === "toprated" ? <hr /> : ""}
              </Link>
            </li>
            <li
              className="nav-item"
              onClick={() => {
                setMenu("upcoming");
              }}
            >
              <Link className="nav-link text-light" to="/up-coming">
                Upcoming {menu === "upcoming" ? <hr /> : ""}
              </Link>
            </li>
          </ul>
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search for a movie..."
              aria-label="Search"
              value={localQuery}
              onChange={handleInputChange}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
