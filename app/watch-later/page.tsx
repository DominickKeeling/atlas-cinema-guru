"use client";

import { useState, useEffect } from "react";
import MovieCard, { Movie } from "@/components/MovieCard";
import Pagination from "@/components/Pagination";

export default function WatchLaterPage() {
  const [watchLater, setWatchLater] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatchLater = async () => {
      setError(null);
      try {
        const response = await fetch(`/api/watch-later?page=${page}&limit=6`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched Watch Later:", data.watchLater);

        setWatchLater(data.watchLater || []);
      } catch (err: any) {
        console.error("Error fetching watch later movies:", err);
        setError(err.message);
      }
    };

    fetchWatchLater();
  }, [page]);

  const handleToggleWatchLater = async (id: string) => {
    try {
      const response = await fetch(`/api/watch-later/${id}`, {
        method: "DELETE", 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setWatchLater((prev) => prev.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Error removing watch later:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold text-white">Watch Later</h1>
      </div>

      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 pl-4 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {watchLater.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onToggleFavorite={() => {}}
            onToggleWatchLater={handleToggleWatchLater}
          />
        ))}
      </div>

      <Pagination onPageChange={(newPage: number) => setPage(newPage)} />
    </div>
  );
}
