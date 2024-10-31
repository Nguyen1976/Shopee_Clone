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
                'scale-top-right': 'scaleTopRight 0.3s ease-in-out forwards',
                'fade-in': 'fadeIn 0.3s ease-in-out forwards',
                'scale-top': 'scaleTop 0.3s ease-in-out forwards',
                'toast-message': 'slideInleft ease 1s, fadeOut linear 0.5s 2.5s forwards'
            },
            keyframes: {
                scaleTopRight: {
                    '0%': {
                        opacity: '0',
                        transform: 'translate(190px, -190px) scale(0)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translate(0, 0) scale(1)',
                    }
                },
                scaleTop: {
                    '0%': {
                        opacity: '0',
                        transform: 'translate(0, -50px) scale(0)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translate(0, 0) scale(1)',
                    }
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                slideInleft: {
                    '0%': {
                        opacity: '0', 
                        transform: 'translateX(450px)'
                    },
                    '40%': {
                        transform: 'translateX(-10%)'
                    },
                    '80%': {
                        transform: 'translateX(0%)'
                    },
                    '100%': {
                        opacity: '1', 
                        transform: 'translateX(0px)'
                    }
                },
                fadeOut: {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' }
                }
            }
        },
    },
    plugins: [
        require('flowbite/plugin')
    ],
};
