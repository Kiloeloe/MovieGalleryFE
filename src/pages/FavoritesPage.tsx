import { useEffect, useState } from "react";
import { favoritesApi } from "../api/client";
import type { MovieSummary } from "../types";
import MovieCard from "../components/MovieCard";

export default function FavoritesPage() {
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFavorites();
  }, []);

  function loadFavorites() {
    setLoading(true);
    favoritesApi
      .list()
      .then(setMovies)
      .catch(() => setError("Couldn't load favorites."))
      .finally(() => setLoading(false));
  }

  async function handleToggleFavorite(movie: MovieSummary) {
    try {
      await favoritesApi.remove(movie.id);
      setMovies((prev) => prev.filter((m) => m.id !== movie.id));
    } catch {
      // no-op; leave the list as-is if the removal failed
    }
  }

  if (loading) return <div className="page-status">Loading...</div>;
  if (error) return <div className="page-status error-text">{error}</div>;

  return (
    <div className="page">
      <h1>My Favorites</h1>
      {movies.length === 0 ? (
        <div className="page-status">
          You haven't favorited any movies yet.
        </div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
