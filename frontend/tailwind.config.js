/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          primary: '#0F172A',   
          secondary: '#4F46E5',  
          accent: '#F59E0B',    
          background: '#FBFBFB', 
          text: '#1E293B',       
          warning: '#F59E0B',   
          danger: '#E11D48'      
        }
      }
    },
  },
  plugins: [],
}

