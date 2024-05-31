import React, { useEffect, useContext } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import "./MovieDetail.css";
import { MovieContext } from "../Context/MovieContext";

const MovieDetail = () => {
  const { id } = useParams();
  const context = useContext(MovieContext);

  const {
    movieDetails,
    movieCast,
    fetchMovieDetails,
    fetchMovieCast,
    loading,
  } = context;

  useEffect(() => {
    fetchMovieDetails(id);
    fetchMovieCast(id);
  }, [id, fetchMovieDetails, fetchMovieCast]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${weekday} ${month} ${day} ${year}`;
  };

  if (loading || !movieDetails || !movieCast) {
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
    <div className="movie-detail-container">
      <>
        {movieDetails && movieDetails.backdrop_path && (
          <div className="image-container-backdrop">
            <img
              className="image-backdrop"
              src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
              alt={movieDetails.title}
            />
          </div>
        )}

        <div className="movie-overview-detail">
          <div>
            <div className="movie-content">
              {movieDetails && movieDetails.poster_path && (
                <div>
                  <img
                    className="image-poster"
                    src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                    alt={movieDetails.title}
                  />
                </div>
              )}

              <div className="movie-details">
                {movieDetails && (
                  <>
                    <h4>{movieDetails.title}</h4>
                    <p className="rating">
                      Rating: {movieDetails.vote_average}
                    </p>
                    <p className="run-time">{movieDetails.runtime} min</p>
                    <p className="genres">
                      {movieDetails.genres &&
                        movieDetails.genres.map((genre, index) => (
                          <span key={genre.id}>
                            {genre.name}
                            {index < movieDetails.genres.length - 1 ? ", " : ""}
                          </span>
                        ))}
                    </p>
                    <p className="date-release">
                      Release Date: {formatDate(movieDetails.release_date)}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="overview-con">
              {movieDetails && (
                <>
                  <p className="over-view">Overview</p>
                  <p className="about">{movieDetails.overview}</p>
                </>
              )}
            </div>
          </div>
        </div>

        <h2 className="cast-title">Cast</h2>
        <ul className="cast-list">
          {movieCast.map((member) => (
            <li key={member.cast_id} className="cast-item">
              {member.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                  alt={member.name}
                />
              ) : (
                <img
                  src={`https://via.placeholder.com/150`}
                  alt={member.name}
                />
              )}
              <p>{member.name}</p>
              <p>Character: {member.character}</p>
            </li>
          ))}
        </ul>
      </>
    </div>
  );
};

export default MovieDetail;
