/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        'noto-sans-kr': ['Noto Sans KR', 'sans-serif'],
      },
      colors: {
        primary: '#D68C47',
        secondary: '#333333',
        accent: '#F5F5F5',
      },
    },
  },
  plugins: [],
}
