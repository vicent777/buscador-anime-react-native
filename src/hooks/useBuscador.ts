import { useState } from "react";

export default function useBuscador() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const types = ["TV", "Movie", "OVA"];

  async function searchAnime(query: string) {
    if (!query) return;

    setLoading(true);
    setResults([]);

    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${query}&limit=20`
    );
    const json = await res.json();

    setResults(json.data || []);
    setLoading(false);
  }

  function toggleFilter(filter: string) {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  }

  const filteredResults =
    activeFilters.length === 0
      ? results
      : results.filter((a) => activeFilters.includes(a.type));

  return {
    loading,
    results,
    types,
    activeFilters,
    toggleFilter,
    searchAnime,
    filteredResults,
  };
}
