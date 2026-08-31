import { Link } from "react-router-dom";
import type { MovieSummary } from "../types";

interface Props {
  movie: MovieSummary;
  onToggleFavorite: (movie: MovieSummary) => void;
}

export default function MovieCard({ movie, onToggleFavorite }: Props) {
  return (
    <div className="movie-card">
      <Link to={`/movies/${movie.id}`}>
        <img src={movie.posterUrl} alt={movie.title} loading="lazy" />
      </Link>
      <div className="movie-card-body">
        <Link to={`/movies/${movie.id}`} className="movie-card-title">
          {movie.title}
        </Link>
        <div className="movie-card-meta">
          {movie.releaseYear} • {movie.genre} • ⭐ {movie.rating.toFixed(1)}
        </div>
        <button
          className={movie.isFavorite ? "fav-btn active" : "fav-btn"}
          onClick={() => onToggleFavorite(movie)}
        >
          {movie.isFavorite ? "★ Favorited" : "☆ Add to Favorites"}
        </button>
      </div>
    </div>
  );
}
