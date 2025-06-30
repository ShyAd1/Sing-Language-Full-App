/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta principal basada en la imagen
        'neon-pink': '#FF00FF',     // Rosa/magenta neón
        'neon-green': '#00FF00',    // Verde neón
        'pixel-pink': '#FF69B4',   // Rosa más suave para píxeles
        'deep-black': '#000000',   // Negro profundo
        'star-yellow': '#FFD700',  // Amarillo para estrellas
        'cyber-cyan': '#00FFFF',   // Cian para bordes
        'dark-bg': '#0A0A0A',      // Fondo muy oscuro
        'retro-red': '#FF0000',    // Rojo retro para botones
        
        // Variaciones para diferentes usos
        primary: {
          50: '#FFE6FF',
          100: '#FFCCFF',
          200: '#FF99FF',
          300: '#FF66FF',
          400: '#FF33FF',
          500: '#FF00FF',  // neon-pink principal
          600: '#CC00CC',
          700: '#990099',
          800: '#660066',
          900: '#330033',
        },
        secondary: {
          50: '#E6FFE6',
          100: '#CCFFCC',
          200: '#99FF99',
          300: '#66FF66',
          400: '#33FF33',
          500: '#00FF00',  // neon-green principal
          600: '#00CC00',
          700: '#009900',
          800: '#006600',
          900: '#003300',
        }
      },
      fontFamily: {
        'pixel': ['Courier New', 'monospace'],
        'retro': ['Orbitron', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'neon-pink': '0 0 20px #FF00FF, 0 0 40px #FF00FF, 0 0 60px #FF00FF',
        'neon-green': '0 0 20px #00FF00, 0 0 40px #00FF00, 0 0 60px #00FF00',
        'neon-cyan': '0 0 20px #00FFFF, 0 0 40px #00FFFF, 0 0 60px #00FFFF',
      }
    },
  },
  plugins: [],
}

