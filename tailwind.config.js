/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts}'],
    theme: {
        extend: {
            colors: {
                theme: {
                    'blue-50': '#f2f7fd',
                    'blue-100': '#e4edfa',
                    'blue-200': '#c3d9f4',
                    'blue-300': '#8ebbeb',
                    'blue-400': '#5197df',
                    'blue-500': '#2b7bcc',
                    'blue-600': '#1c60ad',
                    'blue-700': '#184c8c',
                    'blue-800': '#174071',
                    'blue-900': '#193961',
                    'gray-100': '#F5F5F5',
                    'gray-200': '#E8E8E8',
                    'gray-300': '#DCDCDC',
                    'gray-400': '#D3D3D3',
                    'gray-500': '#8F8F8F',
                    'gray-600': '#808080',
                    'gray-700': '#5C6770',
                    'gray-800': '#2E323A',
                    'gray-900': '#262A30',
                    'teal-50': '#f0fdfc',
                    'teal-100': '#cdfaf5',
                    'teal-200': '#9bf4ee',
                    'teal-300': '#61e7e2',
                    'teal-400': '#31d0cf',
                    'teal-500': '#19babc',
                    'teal-600': '#108d91',
                    'teal-700': '#117074',
                    'teal-800': '#13585c',
                    'teal-900': '#144a4d',
                    'light-white': '#ffffff0f',
                    'light-gray': '#383c44'
                }
            },
            fontFamily: {
                cairo: ['Cairo']
            },
            width: {
                18: '4.375rem'
            },
            maxHeight: {
                46: '11.5rem'
            },
            zIndex: {
                70: 70,
                80: 80,
                90: 90
            },
            keyframes: {
                shake: {
                    '10%, 90%': { transform: 'translate3d(-1px, 0, 0)', 'animation-timing-function': 'cubic-bezier(.36,.07,.19,.97)'},
                    '20%, 80%': { transform: 'translate3d(2px, 0, 0)', 'animation-timing-function': 'cubic-bezier(.36,.07,.19,.97)' },
                    '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)', 'animation-timing-function': 'cubic-bezier(.36,.07,.19,.97)'},
                    '40%, 60%': { transform: 'translate3d(4px, 0, 0)', 'animation-timing-function': 'cubic-bezier(.36,.07,.19,.97)' }
                }
            },
            animation: {
                shake: 'shake 0.82s'
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'class'
        })
    ],
}
