import { useState } from "react";
import type { FormEvent } from "react";
import { moviesApi, favoritesApi } from "../api/client";
import type { MovieSummary } from "../types";
import MovieCard from "../components/MovieCard";

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (!keyword.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const results = await moviesApi.search(keyword.trim());
      setMovies(results);
      setSearched(true);
    } catch {
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

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

  return (
    <div className="page">
      <h1>Search Movies</h1>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by title, genre, or director..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <div className="error-text">{error}</div>}

      {searched && !loading && movies.length === 0 && (
        <div className="page-status">No movies matched "{keyword}".</div>
      )}

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
