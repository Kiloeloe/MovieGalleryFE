import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { moviesApi, favoritesApi } from "../api/client";
import type { MovieDetail } from "../types";
import Carousel from "../components/Carousel";

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    moviesApi
      .getById(Number(id))
      .then(setMovie)
      .catch(() => setError("Movie not found."))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleToggleFavorite() {
    if (!movie) return;
    const wasFavorite = movie.isFavorite;
    setMovie({ ...movie, isFavorite: !wasFavorite });
    try {
      if (wasFavorite) {
        await favoritesApi.remove(movie.id);
      } else {
        await favoritesApi.add(movie.id);
      }
    } catch {
      setMovie({ ...movie, isFavorite: wasFavorite });
    }
  }

  if (loading) return <div className="page-status">Loading...</div>;
  if (error || !movie)
    return <div className="page-status error-text">{error ?? "Not found."}</div>;

  return (
    <div className="page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="movie-detail">
        <img src={movie.posterUrl} alt={movie.title} />
        <div className="movie-detail-info">
          <h1>{movie.title}</h1>
          <p className="movie-card-meta">
            {movie.releaseYear} • {movie.genre} • ⭐ {movie.rating.toFixed(1)}
          </p>
          <p>
            <strong>Director:</strong> {movie.director}
          </p>
          <p>
            <strong>Cast:</strong> {movie.cast}
          </p>
          <p>{movie.description}</p>
          <button
            className={movie.isFavorite ? "fav-btn active" : "fav-btn"}
            onClick={handleToggleFavorite}
          >
            {movie.isFavorite ? "★ Favorited" : "☆ Add to Favorites"}
          </button>
        </div>
      </div>

      {(movie.screenshotUrls ?? []).length > 0 && (
        <div className="screenshots-section">
          <h2>Screenshots</h2>
          <Carousel images={movie.screenshotUrls} alt={movie.title} />
        </div>
      )}
    </div>
  );
}
