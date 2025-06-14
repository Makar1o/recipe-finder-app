import Image from 'next/image';

async function getRecipe(id: string) {
  const params = new URLSearchParams({
    apiKey: process.env.SPOONACULAR_API_KEY!,
    includeNutrition: 'false',
  });

  const res = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?${params}`,
  );

  if (!res.ok) throw new Error('Failed to fetch recipe');

  return res.json();
}

interface RecipePageProps {
  params: {
    id: string;
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await getRecipe(params.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 sm:p-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight tracking-tight text-center">
            {recipe.title}
          </h1>

          <div className="rounded-xl overflow-hidden mb-8 shadow-md">
            <Image
              src={recipe.image}
              alt={recipe.title}
              width={900}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed prose-headings:text-gray-900 prose-p:mt-0">
            <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
          </div>
        </div>
      </div>
    </div>
  );
}
