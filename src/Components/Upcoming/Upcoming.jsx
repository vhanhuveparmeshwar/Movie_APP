// PopularMovie.js
import { useContext } from "react";
import { Link } from "react-router-dom";

import { BallTriangle } from "react-loader-spinner";
import MovieItems from "../ListItems/MovieItems";
import { MovieContext } from "../Context/MovieContext";

import "./Upcoming.css";
import Pagination from "../Pagination/Pagination";

const UpcomingMovies = () => {
  const context = useContext(MovieContext);

  const {
    upComingMovies,
    upComingtotalPages,
    upComingSearchResults,
    upComingcurrentPage,
    setupComingCurrentPage,
    loading,
  } = context;

  const movies = upComingSearchResults.length
    ? upComingSearchResults
    : upComingMovies;

  const handlePageChange = (page) => {
    setupComingCurrentPage(page);
  };

  if (loading || !upComingMovies || !upComingSearchResults) {
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
            currentPage={upComingcurrentPage}
            totalPages={upComingtotalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default UpcomingMovies;
