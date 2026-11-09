/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#070C18',
          800: '#0B132B',
          700: '#1C2541',
          600: '#2A365C',
        },
        gold: {
          400: '#F3E5AB',
          500: '#D4AF37',
          600: '#C5A059',
          700: '#997A2A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        md: '36rem',      // 576px (was 448px)
        lg: '42rem',      // 672px (was 512px)
        xl: '48rem',      // 768px (was 576px)
        '2xl': '56rem',   // 896px (was 672px)
        '3xl': '64rem',   // 1024px (was 768px)
        '4xl': '72rem',   // 1152px (was 896px)
        '5xl': '80rem',   // 1280px (was 1024px)
        '6xl': '88rem',   // 1408px (was 1152px)
        '7xl': '96rem',   // 1536px (was 1280px)
      },
      fontSize: {
        xs: ['0.9375rem', { lineHeight: '1.375rem' }],     // 15px (12px * 1.25)
        sm: ['1.09375rem', { lineHeight: '1.625rem' }],    // 17.5px (14px * 1.25)
        base: ['1.25rem', { lineHeight: '1.875rem' }],     // 20px (16px * 1.25)
        lg: ['1.40625rem', { lineHeight: '2.0625rem' }],   // 22.5px (18px * 1.25)
        xl: ['1.5625rem', { lineHeight: '2.1875rem' }],    // 25px (20px * 1.25)
        '2xl': ['1.875rem', { lineHeight: '2.5rem' }],     // 30px (24px * 1.25)
        '3xl': ['2.34375rem', { lineHeight: '2.8125rem' }],// 37.5px (30px * 1.25)
        '4xl': ['2.8125rem', { lineHeight: '3.125rem' }],  // 45px (36px * 1.25)
        '5xl': ['3.75rem', { lineHeight: '1.15' }],        // 60px (48px * 1.25)
        '6xl': ['4.6875rem', { lineHeight: '1.12' }],      // 75px (60px * 1.25)
        '7xl': ['5.625rem', { lineHeight: '1.1' }],        // 90px (72px * 1.25)
      },
    },
  },
  plugins: [],
};
