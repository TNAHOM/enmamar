/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Add paths to your template files
  ],
  theme: {
    extend: {
      colors: {
        'purpleStandard': '#893EE8',
        'contentFontColor': "#5B5D6B"
      }
    },
  },
  plugins: [],
}

