import SearchForm from '@/components/SearchForm';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl backdrop-blur-sm bg-opacity-80 border border-white border-opacity-30">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 mb-2">
            Recipe Finder
          </h1>
          <p className="text-gray-600">
            Discover delicious recipes for any occasion
          </p>
        </div>

        <div className="bg-white/90 p-6 rounded-xl shadow-sm border border-gray-100">
          <SearchForm />
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Search among thousands of recipes to find your perfect meal</p>
        </div>
      </div>
    </main>
  );
}
