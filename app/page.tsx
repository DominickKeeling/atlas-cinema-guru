"use client";

import { useState, useEffect } from "react";
import MovieFilters, { Filters } from "@/components/MovieFilters";
import MovieCard, { Movie } from "@/components/MovieCard";
import Pagination from "@/components/Pagination";

export default function HomePage() {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    minYear: "",
    maxYear: "",
    genres: [],
  });

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setPage(1);
  };


  const [page, setPage] = useState<number>(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setError(null);
      try {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", "6");
        if (filters.search) params.append("search", filters.search);
          console.log("Appending search filter:", filters.search);
        if (filters.minYear) params.append("minYear", filters.minYear);
          console.log("Appending minYear filter:", filters.minYear);
        if (filters.maxYear) params.append("maxYear", filters.maxYear);
          console.log("Appending maxYear filter:", filters.maxYear);
        if (filters.genres.length > 0) params.append("genres", filters.genres.join(","));
          console.log("Appending genres filter:", filters.genres.join(","));

        const url = `/api/titles?${params.toString()}`;
        console.log("Fetching movies from URL:", url);
        const response = await fetch(`/api/titles?${params.toString()}`);
        console.log("Response received:", response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data received:", data);
        setMovies(data.title || []);
      } catch (err: any) {
        console.error("Error in fetchMovies:", err);
        setError(err.message);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await fetch("/api/genres");
        const data = await response.json();
        console.log("Fetched Genres:", data.genres)
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
    fetchMovies();
  }, [filters, page]);

  const handleToggleFavorite = async (id: string) => {
    const target = movies.find((m) => m.id === id);
    if (!target) return;
    
    const method = target.favorited ? "DELETE" : "POST";
    try {
      const response = await fetch(`/api/favorites/${id}`, { method });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setMovies((prev) =>
        prev.map((m) => (m.id === id ? { ...m, favorited: !m.favorited } : m))
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleToggleWatchLater = async (id: string) => {
    const target = movies.find((m) => m.id === id);
    if (!target) return;
    const method = target.watchLater ? "DELETE" : "POST";
    try {
      const response = await fetch(`/api/watch-later/${id}`, { method });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setMovies((prev) =>
        prev.map((m) => (m.id === id ? { ...m, watchLater: !m.watchLater } : m))
      );
    } catch (error) {
      console.error("Error toggling watch later:", error);
    }
  };

  return (
    <div className="p-4">
      <MovieFilters
        onFilterChange={handleFilterChange}
        availableGenres={genres}
      />

      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Movies Grid */}
      <div className="grid pl-5 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] lg:grid-cols-3 gap-6 mt-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onToggleFavorite={handleToggleFavorite}
            onToggleWatchLater={handleToggleWatchLater}
          />
        ))}
      </div>

      {/* Pagination Component */}
      <Pagination onPageChange={(newPage: number) => setPage(newPage)} />
    </div>
  );
}
