/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
	theme: {
	  extend: {
		fontFamily: {
		  serif: ['"Source Serif 4"', "serif"],
		  prata: ["Prata", "serif"],
		},
		colors: {
		  ivory: "#F7EFE1",
		  vermilion: "#B93221",
		  charcoal: "#4C4C4C",
		  golden: "#D9A400",
		  turquoise: "#3E8E99",
		  forest: "#3B6A4A",
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  }
  
  