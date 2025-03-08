
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{ts,tsx}"],
  content: ["./screens/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#177E89',
        primaryLight: '#D3E0E2',
        
        secondaryLight: '#00776',
        secondary: '#0077B6',
        
        pending: '#FFC42E',
        pendingLight: '#FFC42E3B',
        overlay: '#0000004D',
        black: '#1E1F20',
        white: '#FFFFFF',
        red: '#FF0000',
        grey: '##EDF3F3',
        grey1: '#ACA0A0',
        lightGrey: '##EDF3F3',
      },
      spacing: {
        containerPadding: '20px',
        padding1: '24px',
        padding2: '18px',
        padding3: '16px',
        padding4: '12px',
        padding5: '10px',
      },
      fontFamily: {
        Kanit: ['Kanit'],
        ALmendra_SC: ['ALmendra_SC'],
        Roboto: ['Roboto', 'sans-serif']
      },
      fontSize: {
        h1: ['30px', '36px'], // Font size followed by line height
        h2: ['24px', '30px'],
        h3: ['20px', '24px'],
        base: ['15px', '20px'],
        small: ['13px', '18px'],
        smaller: ['10px', '14px'],
      },
    },
  },
  plugins: [],
};
