/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./views/**/*.ejs",         // EJS templates
    "./public/**/*.html",       // Any static HTML (if used)
    "./src/**/*.js",            // Your JS files (if any)
    "./server.js"               // If you're writing inline Tailwind in server-rendered templates
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
