module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        primary: {
          50: '#E7E9EF',
          100: '#C2C9D6',
          200: '#9AA4BE',
          300: '#727FA5',
          400: '#4A5A8C',
          500: '#223573', // Main brand color
          600: '#1B2A4A',
          700: '#142039',
          800: '#0D1527',
          900: '#0F172A',
        },
        
        // Accent Colors
        accent: {
          light: '#FB923C',    // Orange
          DEFAULT: '#9333EA',  // Purple
          dark: '#2DD4BF',     // Teal
        },

        // UI Colors
        surface: {
          light: '#FFFFFF',
          DEFAULT: '#F8FAFC',
          dark: '#E2E8F0',
        },

        // Text Colors
        content: {
          primary: '#0F172A',
          secondary: '#475569',
          light: '#94A3B8',
        },

        // Interactive States
        interactive: {
          hover: '#FB923C',
          active: '#9333EA',
          focus: '#2DD4BF',
        },

        // Feedback Colors
        feedback: {
          success: '#22C55E',
          error: '#EF4444',
          warning: '#F59E0B',
          info: '#3B82F6',
        }
      },
    },
  },
  plugins: [],
}