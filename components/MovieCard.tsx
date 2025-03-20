"use client";

import { useState } from "react";
import Image from "next/image";

export type Movie = {
  id: string;
  title: string;
  synopsis: string;
  image: string;
  released: number;
  genre: string;
  favorited: boolean;
  watchLater: boolean;
};

type MovieCardProps = {
  movie: Movie;
  onToggleFavorite: (id: string) => void;
  onToggleWatchLater: (id: string) => void;
};

export default function MovieCard({ movie, onToggleFavorite, onToggleWatchLater }: MovieCardProps) {
  console.log("Rendering Movie card for:", movie);
  const [hover, setHover] = useState(false);

  if (!movie) {
    return null;
  }  

  return (
    <div
      className="relative cursor-pointer w-[300px] h-[300px]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Movie image */}
      <Image src={movie.image} alt={movie.title} width={300} height={300} className="object-cover border-2 border-guru-dark-teal rounded-lg" />
      
      {hover && (
        <div className="absolute inset-0 w-[294px] mb-1 ml-1 mr-2">
          <div className="flex justify-end p-2">
            <button onClick={() => onToggleFavorite(movie.id)} className="flex items-center justify-center w-8 h-8 p-1 bg-opacity-60 rounded-full">
              {movie.favorited ? (
                <Image src="/Icons/solidStar.svg" alt="Favorited" width={20} height={20} />
              ) : (
                <Image src="/Icons/starOutline.svg" alt="Not Favorited" width={20} height={20} />
              )}
            </button>
            <button onClick={() => onToggleWatchLater(movie.id)} className="p-1 bg-opacity-60 rounded-full">
              {movie.watchLater ? (
                <Image src="/Icons/solidClock.svg" alt="Watch Later" width={20} height={20} />
              ) : (
                <Image src="/Icons/outlineClock.svg" alt="Not Watch Later" width={20} height={20} />
              )}
            </button>
          </div>
          <div className=" absolute bottom-0 left-0 right-0 h-1/3 bg-guru-light-navy bg-opacity-50 text-white p-2 flex flex-col justify-between">
            <div>
              <div className="flex flex-row gap-2">
                <h3 className="text-white">{movie.title}</h3>
                <p>({movie.released})</p>
              </div>
              <p className="text-sm">{movie.synopsis}</p>
            </div>
            <div className="flex items-center mb-1 justify-between">
              <span className="text-sm">
                <div className="border-guru-dark-teal rounded-2xl p-1 bg-guru-dark-teal">
                  {movie.genre}
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}