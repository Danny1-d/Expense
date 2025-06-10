import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},

			animation: {
        slideup: 'slideup 2s ease-in-out',
        slidedown: 'slidedown 3s ease-in-out',
        slideleft: 'slideleft 0.3s ease-in-out',
        slideright: 'slideright 0.5s ease-in-out',
        sliderightto: 'slideright 0.5s',
        sliderightto1: 'slideright 0.8s linear',
        sliderightto2: 'slideright 1.2s linear',
        sliderightto3: 'slideright 1.4s linear',
        sliderightto4: 'slideright 1.6s linear',
        sliderightto5: 'slideright 2s linear',
        wave: 'wave 1.2s linear infinite',
        slowfade: 'slowfade 4s ease-in-out',
        rotate: 'rotate 1s linear',
      },
      keyframes: {
        slowfade: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideup: {
          from: { opacity: '0', transform: 'translateY(25%)' },
          to: { opacity: '1', transform: 'none' },
        },
        slidedown: {
          from: { opacity: '0', transform: 'translateY(-25%)' },
          to: { opacity: '1', transform: 'none' },
        },
        slideleft: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideright: {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        sliderightto: {
          '0%': {  transform: 'translateX(300%)' },
          '100%': {  transform: 'translateX(0)' },
        },
        wave: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
        rotate:{
          '100%': {transform: 'rotateZ(360deg)'}
        },
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
