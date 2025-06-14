import Image from 'next/image';
import Link from 'next/link';
import { cache } from 'react';

type Recipe = {
  id: number;
  title: string;
  image: string;
};

const fetchRecipes = cache(
  async (searchParams: {
    query?: string;
    cuisine?: string;
    maxReadyTime?: string;
  }) => {
    const { query, cuisine, maxReadyTime } = searchParams;

    const params = new URLSearchParams({
      apiKey: process.env.SPOONACULAR_API_KEY!,
      ...(query && { query }),
      ...(cuisine && { cuisine }),
      ...(maxReadyTime && { maxReadyTime }),
      number: '12',
    });

    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) throw new Error('Failed to fetch recipes');

    return res.json();
  },
);

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: {
    query?: string;
    cuisine?: string;
    maxReadyTime?: string;
  };
}) {
  let data;

  try {
    data = await fetchRecipes({
      query: searchParams?.query || '',
      cuisine: searchParams?.cuisine || '',
      maxReadyTime: searchParams?.maxReadyTime || '',
    });
  } catch {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-red-500 text-center text-lg bg-red-50 px-6 py-4 rounded-xl max-w-md mx-auto">
          Error fetching recipes. Please try again later.
        </p>
      </div>
    );
  }

  if (!data.results || data.results.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            No recipes found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search filters
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Back to search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-6 sm:px-10 lg:px-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            Delicious Recipes
          </h1>
          <div className="flex flex-wrap gap-3">
            {searchParams.query && (
              <span className="bg-blue-200 text-blue-900 px-4 py-1 rounded-full text-sm font-medium shadow-sm select-none">
                Search: {searchParams.query}
              </span>
            )}
            {searchParams.cuisine && (
              <span className="bg-green-200 text-green-900 px-4 py-1 rounded-full text-sm font-medium shadow-sm select-none">
                Cuisine: {searchParams.cuisine}
              </span>
            )}
            {searchParams.maxReadyTime && (
              <span className="bg-purple-200 text-purple-900 px-4 py-1 rounded-full text-sm font-medium shadow-sm select-none">
                Max time: {searchParams.maxReadyTime} min
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data.results.map((recipe: Recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="group relative flex flex-col rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 rounded-t-lg">
                  <span className="text-white font-semibold text-sm">
                    View Recipe →
                  </span>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <h2 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  {recipe.title}
                </h2>
                <div className="mt-auto flex items-center text-sm text-gray-500 space-x-6">
                  <span className="flex items-center space-x-1">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{Math.floor(Math.random() * 30) + 10} min</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                    <span>
                      {Math.floor(Math.random() * 100) + 20} ratings
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
