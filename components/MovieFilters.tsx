"use client";

import { useState } from "react";

export type Filters = {
  search: string;
  minYear: string;
  maxYear: string;
  genres: string[];
};

type MovieFiltersProps = {
  onFilterChange: (filters: Filters) => void;
  availableGenres: string[];
};

export default function MovieFilters({ onFilterChange, availableGenres = [] }: MovieFiltersProps) {
  const [search, setSearch] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleFilterChange = (newFilters: Partial<Filters> = {}) => {
    const updatedFilters: Filters = {
      search,
      minYear,
      maxYear,
      genres: selectedGenres,
      ...newFilters,
    };
    onFilterChange(updatedFilters);
  };

  const toggleGenre = (genre: string) => {
    let updatedGenres: string[];
    if (selectedGenres.includes(genre)) {
      updatedGenres = selectedGenres.filter((g) => g !== genre);
    } else {
      updatedGenres = [...selectedGenres, genre];
    }
    setSelectedGenres(updatedGenres);
    handleFilterChange({ genres: updatedGenres });
  };

  return (
    <div className="p-4 flex flex-col md:flex-row justify-between">
      <div className="flex flex-col">
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="search" className="text-white">
            Search
          </label>
          <input
            type="text"
            placeholder="Search by title"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleFilterChange({ search: e.target.value });
            }}
            className="border bg-guru-light-navy rounded-3xl border-guru-dark-teal p-2 w-full"
          />
        </div>
        <div>
          <div className="mb-4 flex flex-wrap max-w-md">
            <div className="flex flex-col pb-2">
              <label htmlFor="min year" className="text-white">
                Min Year
              </label>
              <input
                type="number"
                placeholder="Min Year"
                value={minYear}
                onChange={(e) => {
                  setMinYear(e.target.value);
                  handleFilterChange({ minYear: e.target.value });
                }}
                className="border bg-guru-light-navy border-guru-dark-teal p-2 rounded-3xl mt-2 mr-5"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="max year" className="text-white">
                  Max Year
                </label>
              <input
                type="number"
                placeholder="Max Year"
                value={maxYear}
                onChange={(e) => {
                  setMaxYear(e.target.value);
                  handleFilterChange({ maxYear: e.target.value });
                }}
                className="border bg-guru-light-navy border-guru-dark-teal rounded-3xl p-2 mt-2 w-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="font-bold mb-2">Genres</p>
        <div className="flex flex-wrap gap-2 max-w-md">
          {/* Example genres. In a real app, these might come from your data */}
          {availableGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`border border-guru-dark-teal px-auto rounded-3xl ${
              selectedGenres.includes(genre)
                ? "bg-guru-dark-teal"
                : "bg-guru-light-navy"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
