'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchForm() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [maxTime, setMaxTime] = useState('');

  const isValid = query || cuisine || maxTime;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (cuisine) params.append('cuisine', cuisine);
    if (maxTime) params.append('maxReadyTime', maxTime);
    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto">
      <div>
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          What would you like to cook?
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search recipe (e.g. pasta, salad, chicken)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-sans text-gray-800"
        />
      </div>

      <div>
        <label
          htmlFor="cuisine"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Cuisine type
        </label>
        <select
          id="cuisine"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-sans text-gray-800 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjY3YWI4IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[right_1rem_center]"
        >
          <option value="">Any cuisine</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
          <option value="Chinese">Chinese</option>
          <option value="Indian">Indian</option>
          <option value="Japanese">Japanese</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="time"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Maximum cooking time
        </label>
        <div className="relative">
          <input
            id="time"
            type="number"
            placeholder="e.g. 30 minutes"
            value={maxTime}
            onChange={(e) => setMaxTime(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-sans text-gray-800 pr-12"
          />
          <span className="absolute right-4 top-3.5 text-gray-500 font-medium">
            min
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200 ${
          isValid
            ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-md hover:shadow-lg'
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        Next
      </button>
    </form>
  );
}
