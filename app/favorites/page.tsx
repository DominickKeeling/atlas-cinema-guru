"use client";

import { useState, useEffect } from "react";
import MovieCard, { Movie } from "@/components/MovieCard";
import Pagination from "@/components/Pagination";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setError(null);
      try {
        const response = await fetch(`/api/favorites?page=${page}&limit=6`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched Favorites:", data.favorites);

        setFavorites(data.favorites || []);
      } catch (err: any) {
        console.error("Error fetching favorites:", err);
        setError(err.message);
      }
    };

    fetchFavorites();
  }, [page]);

  const handleToggleFavorite = async (id: string) => {
    try {
      const response = await fetch(`/api/favorites/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setFavorites((prev) => prev.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const handleToggleWatchLater = async (id: string) => {
    try {
      const response = await fetch(`/api/watch-later/${id}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setFavorites((prev) =>
        prev.map((movie) =>
          movie.id === id ? { ...movie, watchLater: !movie.watchLater } : movie
        )
      );
    } catch (error) {
      console.error("Error toggling watch later:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-center">
        <h1 className="text-2xl flex font-bold text-white">Favorites</h1>
      </div>
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 pl-4 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onToggleFavorite={handleToggleFavorite} 
            onToggleWatchLater={handleToggleWatchLater}
          />
        ))}
      </div>

      <Pagination onPageChange={(newPage: number) => setPage(newPage)} />
    </div>
  );
}
