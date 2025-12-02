/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/react-app/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Text colors
    'text-blue-600', 'text-green-600', 'text-sky-600', 'text-red-600', 
    'text-purple-600', 'text-orange-600', 'text-pink-600', 'text-indigo-600',
    'text-teal-600', 'text-rose-600', 'text-amber-600', 'text-lime-600',
    'text-cyan-600', 'text-violet-600', 'text-fuchsia-600', 'text-emerald-600',
    
    'text-blue-700', 'text-green-700', 'text-sky-700', 'text-red-700',
    'text-purple-700', 'text-orange-700', 'text-pink-700', 'text-indigo-700',
    'text-teal-700', 'text-rose-700', 'text-amber-700', 'text-lime-700',
    'text-cyan-700', 'text-violet-700', 'text-fuchsia-700', 'text-emerald-700',
    
    // Background colors
    'bg-blue-50', 'bg-green-50', 'bg-sky-50', 'bg-red-50',
    'bg-purple-50', 'bg-orange-50', 'bg-pink-50', 'bg-indigo-50',
    'bg-teal-50', 'bg-rose-50', 'bg-amber-50', 'bg-lime-50',
    'bg-cyan-50', 'bg-violet-50', 'bg-fuchsia-50', 'bg-emerald-50',
    
    'bg-blue-600', 'bg-green-600', 'bg-sky-600', 'bg-red-600',
    'bg-purple-600', 'bg-orange-600', 'bg-pink-600', 'bg-indigo-600',
    'bg-teal-600', 'bg-rose-600', 'bg-amber-600', 'bg-lime-600',
    'bg-cyan-600', 'bg-violet-600', 'bg-fuchsia-600', 'bg-emerald-600',
    
    'bg-blue-700', 'bg-green-700', 'bg-sky-700', 'bg-red-700',
    'bg-purple-700', 'bg-orange-700', 'bg-pink-700', 'bg-indigo-700',
    'bg-teal-700', 'bg-rose-700', 'bg-amber-700', 'bg-lime-700',
    'bg-cyan-700', 'bg-violet-700', 'bg-fuchsia-700', 'bg-emerald-700',
    
    // Hover background colors
    'hover:bg-blue-50', 'hover:bg-green-50', 'hover:bg-sky-50', 'hover:bg-red-50',
    'hover:bg-purple-50', 'hover:bg-orange-50', 'hover:bg-pink-50', 'hover:bg-indigo-50',
    'hover:bg-teal-50', 'hover:bg-rose-50', 'hover:bg-amber-50', 'hover:bg-lime-50',
    'hover:bg-cyan-50', 'hover:bg-violet-50', 'hover:bg-fuchsia-50', 'hover:bg-emerald-50',
    
    'hover:bg-blue-700', 'hover:bg-green-700', 'hover:bg-sky-700', 'hover:bg-red-700',
    'hover:bg-purple-700', 'hover:bg-orange-700', 'hover:bg-pink-700', 'hover:bg-indigo-700',
    'hover:bg-teal-700', 'hover:bg-rose-700', 'hover:bg-amber-700', 'hover:bg-lime-700',
    'hover:bg-cyan-700', 'hover:bg-violet-700', 'hover:bg-fuchsia-700', 'hover:bg-emerald-700',
    
    // Hover text colors
    'hover:text-blue-700', 'hover:text-green-700', 'hover:text-sky-700', 'hover:text-red-700',
    'hover:text-purple-700', 'hover:text-orange-700', 'hover:text-pink-700', 'hover:text-indigo-700',
    'hover:text-teal-700', 'hover:text-rose-700', 'hover:text-amber-700', 'hover:text-lime-700',
    'hover:text-cyan-700', 'hover:text-violet-700', 'hover:text-fuchsia-700', 'hover:text-emerald-700',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
