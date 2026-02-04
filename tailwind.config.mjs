/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Ubikala Primary - Olive Green (acción, buscar, CTA)
        primary: {
          50: '#f4f6ef',
          100: '#e6ebd9',
          200: '#cdd8b5',
          300: '#aec088',
          400: '#8fa662',
          500: '#6b7f3e',  // Medium olive
          600: '#5b6e3c',  // Main action color
          700: '#556b2f',  // Dark olive
          800: '#454f2a',
          900: '#3a4226',
          950: '#1e2313',
        },
        // Ubikala Secondary - Sand/Arena (fondos, cards)
        secondary: {
          50: '#fdfcf9',
          100: '#faf9f6',  // Ivory
          200: '#f7f5f0',  // Light ivory
          300: '#f3ecdc',  // Sand light
          400: '#efe6d2',  // Sand medium
          500: '#e8dec8',  // Sand
          600: '#d4c5a9',
          700: '#b9a683',
          800: '#9a8762',
          900: '#7d6d4d',
          950: '#423823',
        },
        // Ubikala Accent - Terracotta (precios, badges, destacados)
        accent: {
          50: '#fdf5ef',
          100: '#fae8d9',
          200: '#f4cdb2',
          300: '#ecab80',
          400: '#e2814d',
          500: '#d9622e',
          600: '#b86b3e',  // Terracotta main
          700: '#a65a2a',  // Terracotta dark
          800: '#7e4325',
          900: '#673923',
          950: '#381b10',
        },
        // Warm grays for text
        gray: {
          50: '#faf9f7',
          100: '#f5f4f1',
          200: '#e8e6e1',
          300: '#d5d2cb',
          400: '#a9a49a',
          500: '#7d7870',
          600: '#5a5a5a',  // Body text
          700: '#4a4a4a',
          800: '#3f3f3f',  // Headings
          900: '#2d2d2d',
          950: '#1a1a1a',
        },
        // Ivory backgrounds
        ivory: {
          DEFAULT: '#faf9f6',
          light: '#fdfcf9',
          dark: '#f7f5f0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundColor: {
        'ubikala': '#faf9f6',
      }
    },
  },
  plugins: [],
}
