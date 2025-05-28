const config = {
  plugins: ["@tailwindcss/postcss"],
  tailwindcss: {
    theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
        roboto: ['var(--font-roboto)'],
        poppins: ['var(--font-poppins)'],
        'open-sans': ['var(--font-open-sans)'],
      },
    },
  },
  },
};

export default config;
