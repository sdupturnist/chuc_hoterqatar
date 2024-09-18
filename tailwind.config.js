/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '3rem',
        xl: '3rem',
        '2xl': '3rem',
      },
      screens: {
        'sm': '575px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
    extend: {
      colors: {
        chocolates: {
          100: '#c89a3f',
          200: '#d1a54b',
          300: '#d9b457',
          400: '#e1be64',
          500: '#e8c871',
          600: '#f0d17e',
          700: '#f7d98b',
          800: '#fbe69b',
          900: '#FCF9F4',
        },
        flowers: {
          100: '#E62263',
          200: '#E74B7A',
          300: '#E9748F',
          400: '#EB9B9E',
          500: '#F1C1B0',
          600: '#F4D5C3',
          700: '#F7E3D6',
          800: '#F9E9E0',
          900: '#fdd9d9',
        },
        cakes: {
          100: '#E79F02',
          200: '#E8B12E',
          300: '#E9C55C',
          400: '#EAD075',
          500: '#F0D68F',
          600: '#F4E1A7',
          700: '#F6E9B8',
          800: '#F9F0CC',
          900: '#fffbe8',
        },
        events: {
          100: '#258F89',
          200: '#3A9D9A',
          300: '#4FB9A7',
          400: '#66C6B4',
          500: '#7CD3C1',
          600: '#92DAD0',
          700: '#A9E1DD',
          800: '#BFE6E9',
          900: '#eaf4f3',
        },
        black: '#c89a3f',
        gray: '#c89a3f',
        red: {
          DEFAULT: '#FF0000', // Set the default red color
        },
      },
      fontFamily: {
        primary: ['Italiana', 'sans-serif'],
        secondary: ['bon_vivantregular'],
        tertiary: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require("daisyui"),
    function ({ addComponents }) {
      addComponents({
        '.btn': {
          backgroundColor: '#c89a3f', // Set button background to red
          borderColor:'#c89a3f', 
          color: '#FFFFFF', // Set button text color to white
          '&:hover': {
            backgroundColor: '#e1be64', // Darker red on hover
             borderColor:'#e1be64', 
          },
        },
        '.btn-outline': {
          backgroundColor: '#fff', // Set button background to red
          borderColor:'#c89a3f', 
          color: '#c89a3f', // Set button text color to white
          '&:hover': {
            backgroundColor: '#e1be64', // Darker red on hover
             borderColor:'#e1be64', 
          },
        },
      });
    },
  ],
  daisyui: {
    themes: false,
    darkTheme: "light",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
};
