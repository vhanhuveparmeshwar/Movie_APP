// PopularMovie.js
import { useContext } from "react";
import { Link } from "react-router-dom";

import { BallTriangle } from "react-loader-spinner";
import MovieItems from "../ListItems/MovieItems";
import { MovieContext } from "../Context/MovieContext";

import "./Popular.css";
import Pagination from "../Pagination/Pagination";

const PopularMovie = () => {
  const context = useContext(MovieContext);

  // console.log(context)

  const {
    popularMovies,
    searchResults,
    currentPage,
    totalPages,
    setCurrentPage,
    loading,
  } = context;

  // console.log(popularMovies)

  const movies = searchResults.length ? searchResults : popularMovies;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading || !popularMovies) {
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

        {loading ? (
          ""
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
        )}
      </ul>
    </div>
  );
};

export default PopularMovie;
