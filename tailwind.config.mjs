/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // ============================================
        // UBIKALA COLOR PALETTE (Reference/Current)
        // Earthy Palette: Verde oliva, Arena, Terracota, Marfil, Gris cálido
        // ============================================

        // Ubikala Primary - Olive Green (acción, buscar, CTA)
        primary: {
          50: '#f4f6ef',
          100: '#e6ebd9',
          200: '#cdd8b5',
          300: '#aec088',
          400: '#8fa662',
          500: '#7A8B5A',  // Olive light (reference)
          600: '#5C6B3C',  // Main olive (reference)
          700: '#4A5730',  // Olive dark (reference)
          800: '#3d4828',
          900: '#323b21',
          950: '#1e2313',
        },
        // Ubikala Secondary - Sand/Arena (fondos, cards)
        secondary: {
          50: '#FFFEF9',   // Ivory pure (reference)
          100: '#FAF7F0',  // Ivory (reference)
          200: '#E8DFD0',  // Sand light (reference)
          300: '#D4C4A8',  // Sand (reference)
          400: '#C4B498',
          500: '#B5A68A',  // Sand dark (reference)
          600: '#a08f74',
          700: '#8a7a62',
          800: '#736551',
          900: '#5f5343',
          950: '#423823',
        },
        // Ubikala Accent - Terracotta (precios, badges, destacados)
        accent: {
          50: '#fdf5ef',
          100: '#fae8d9',
          200: '#f4cdb2',
          300: '#ecab80',
          400: '#e2814d',
          500: '#C96D3D',  // Terracotta main (reference)
          600: '#A85A30',  // Terracotta dark (reference)
          700: '#8f4d29',
          800: '#764022',
          900: '#62361d',
          950: '#381b10',
        },
        // Warm grays for text (reference)
        gray: {
          50: '#faf9f7',
          100: '#f5f4f1',
          200: '#e8e6e1',
          300: '#d5d2cb',
          400: '#8B8680',  // Warm gray light (reference)
          500: '#6B6660',  // Warm gray (reference)
          600: '#5a5550',
          700: '#4A4642',  // Warm gray dark (reference)
          800: '#3d3a37',
          900: '#2d2b29',
          950: '#1a1918',
        },
        // Ivory backgrounds (reference)
        ivory: {
          DEFAULT: '#FAF7F0',  // Ivory (reference)
          light: '#FFFEF9',    // Ivory pure (reference)
          dark: '#E8DFD0',     // Sand light (reference)
        },

        // ============================================
        // LEGACY COLORS (Previous palette - for rollback)
        // To revert, swap 'legacy' with main colors above
        // ============================================
        legacy: {
          // Previous Primary (Olive)
          'primary-500': '#6b7f3e',
          'primary-600': '#5b6e3c',
          'primary-700': '#556b2f',
          // Previous Secondary (Sand)
          'secondary-50': '#fdfcf9',
          'secondary-100': '#faf9f6',
          'secondary-200': '#f7f5f0',
          'secondary-300': '#f3ecdc',
          'secondary-400': '#efe6d2',
          'secondary-500': '#e8dec8',
          'secondary-600': '#d4c5a9',
          'secondary-700': '#b9a683',
          // Previous Accent (Terracotta)
          'accent-500': '#d9622e',
          'accent-600': '#b86b3e',
          'accent-700': '#a65a2a',
          // Previous Grays
          'gray-400': '#a9a49a',
          'gray-500': '#7d7870',
          'gray-600': '#5a5a5a',
          'gray-700': '#4a4a4a',
          'gray-800': '#3f3f3f',
          // Previous Ivory
          'ivory': '#faf9f6',
          'ivory-light': '#fdfcf9',
          'ivory-dark': '#f7f5f0',
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
