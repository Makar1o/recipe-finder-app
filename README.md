# Recipe Finder App

---

## Project Overview

Recipe Finder App is a modern web application that helps users find recipes based on search query, cuisine type, and maximum preparation time. Built with Next.js 13 (App Router) and React 18, it supports server-side rendering for fast performance and SEO optimization.

---

## Features

- Search recipes via Spoonacular API with filters for query, cuisine, and max ready time  
- Dynamic recipe detail pages  
- Server Components and React caching for optimized data fetching  
- Responsive design with Tailwind CSS  
- Error handling for API requests  
- TypeScript for type safety  

---

## Architecture

- `app/recipes/page.tsx` — recipe search and results page  
- `app/recipes/[id]/page.tsx` — individual recipe detail page  
- Data fetching logic with React `cache` for caching API calls  
- Uses Next.js Server Components for improved performance  

---

## Getting Started

### Prerequisites

- Node.js 18+  
- npm or yarn  
- Spoonacular API key (free registration at [spoonacular.com](https://spoonacular.com))  

### Installation


git clone https://github.com/Makar1o/recipe-finder-app.git
cd recipe-finder-app
npm install

Create a .env.local file in the root folder and add your API key:
SPOONACULAR_API_KEY=your_api_key_here

Run Locally
npm run dev
Open http://localhost:3000 in your browser.

Technologies Used
Next.js 13 (App Router)
React 18
TypeScript
Tailwind CSS
Spoonacular API


Contact
Feel free to reach out:
Email: makario27007@gmail.com
GitHub: https://github.com/Makar1o
