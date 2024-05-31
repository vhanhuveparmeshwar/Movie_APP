import "./MovieItems.css";

const API_BASE_URL = "https://image.tmdb.org/t/p/w500/";

const MovieItems = (props) => {
  const { movieData } = props;
  const { id, title, poster_path, vote_average } = movieData;

  const rating = vote_average.toFixed(1);
  return (
    <div className="list-items" key={id}>
      <div>
        <li>
          {poster_path ? (
            <img
              className="movie-img"
              src={`${API_BASE_URL}${poster_path}`}
              alt={title}
            />
          ) : (
            <img
              className="movie-img"
              src={`https://via.placeholder.com/150`}
              alt={title}
            />
          )}
        </li>
        <li className="movie-title">{title}</li>
        <li className="movie-rating">Rating: {rating}</li>
      </div>
    </div>
  );
};

export default MovieItems;
