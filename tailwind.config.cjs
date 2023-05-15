/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [    
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./screens/**/*.{html,js,ts,jsx,tsx}",
    "./component/**/*.{html,js,ts,jsx,tsx}",
    ],
  theme: {
    extend: {
        screens: {
        'xm': { 'min' : '360px' },
        'sm': { 'min': '640px' },
        'md': { 'min': '768px' },
        'md-2': {'min': '850px'},
        'lg': { 'min': '1024px' },
        'xl': { 'min': '1280px' },
        '2xl': {'min': '1536px'}
        }
    },
  },
  plugins: [],
}
