/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                header: 'linear-gradient(-180deg, #f53d2d, #f63)',
            },
            colors: {
                primary: '#fb5533',
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in-out forwards',
                scale: 'scale 0.2s linear forwards',
                'toast-message':
                    'slideInleft ease 1s, slideInRight linear 0.75s 3s forwards',
            },
            keyframes: {
                scale: {
                    '0%': {
                        opacity: '0',
                        transform: 'scale(0)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'scale(1)',
                    },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideInleft: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateX(450px)',
                    },
                    '40%': {
                        transform: 'translateX(-10%)',
                    },
                    '80%': {
                        transform: 'translateX(0%)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateX(0px)',
                    },
                },
                fadeOut: {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },
                slideInRight: {
                    '0%': {
                        transform: 'translateX(0px)',
                    },
                    '40%': {
                        transform: 'translateX(1%)',
                    },
                    '80%': {
                        transform: 'translateX(-10%)',
                    },
                    '100%': {
                        transform: 'translateX(450px)',
                    },
                },
            },
        },
    },
    plugins: [],
};
