import { useEffect, useState } from "react";
import { moviesApi, favoritesApi } from "../api/client";
import type { MovieSummary } from "../types";
import MovieCard from "../components/MovieCard";

export default function PopularMoviesPage() {
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    moviesApi
      .getPopular()
      .then(setMovies)
      .catch(() => setError("Couldn't load popular movies."))
      .finally(() => setLoading(false));
  }, []);

  async function handleToggleFavorite(movie: MovieSummary) {
    setMovies((prev) =>
      prev.map((m) =>
        m.id === movie.id ? { ...m, isFavorite: !m.isFavorite } : m
      )
    );
    try {
      if (movie.isFavorite) {
        await favoritesApi.remove(movie.id);
      } else {
        await favoritesApi.add(movie.id);
      }
    } catch {
      setMovies((prev) =>
        prev.map((m) =>
          m.id === movie.id ? { ...m, isFavorite: movie.isFavorite } : m
        )
      );
    }
  }

  if (loading) return <div className="page-status">Loading...</div>;
  if (error) return <div className="page-status error-text">{error}</div>;

  return (
    <div className="page">
      <h1>Popular Movies</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
