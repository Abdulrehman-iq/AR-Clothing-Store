module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'navy': {
            50: '#E7E9EF',
            100: '#C2C9D6',
            200: '#9AA4BE',
            300: '#727FA5',
            400: '#4A5A8C',
            500: '#223573',
            600: '#1B2A4A',
            700: '#142039',
            800: '#0D1527',
            900: '#0F172A',
          },
          'accent': {
            orange: '#FB923C',
            purple: '#9333EA',
            teal: '#2DD4BF',
          },
          'neutral': {
            light: '#F8FAFC',
            medium: '#E2E8F0',
            dark: '#475569',
          },
          'highlight': {
            primary: '#FEF3C7',
            secondary: '#E0E7FF',
          }
        },
      },
    },
    plugins: [],
  }