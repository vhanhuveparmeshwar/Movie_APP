// PopularMovie.js
import { useContext } from "react";
import { Link } from "react-router-dom";

import { BallTriangle } from "react-loader-spinner";
import MovieItems from "../ListItems/MovieItems";
import { MovieContext } from "../Context/MovieContext";

import "./Toprated.css";
import Pagination from "../Pagination/Pagination";

const TopRated = () => {
  const context = useContext(MovieContext);

  const {
    topRatedMovies,
    topRatedSearchResults,
    topRatedtotalPages,
    topRatedcurrentPage,
    settopRatedCurrentPage,
    loading,
  } = context;

  const movies = topRatedSearchResults.length
    ? topRatedSearchResults
    : topRatedMovies;

  const handlePageChange = (page) => {
    settopRatedCurrentPage(page);
  };

  console.log(topRatedMovies);

  if (loading || !topRatedMovies || !topRatedSearchResults) {
    return (
      <div className="loader">
        <BallTriangle
          height={100}
          width={100}
          color="blue"
          ariaLabel="loading"
        />
      </div>
    );
  }

  return (
    <div className="popular-movies">
      <ul className="list-container">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <MovieItems movieData={movie} />
          </Link>
        ))}
      </ul>
      {loading ? (
        ""
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            currentPage={topRatedcurrentPage}
            totalPages={topRatedtotalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default TopRated;
