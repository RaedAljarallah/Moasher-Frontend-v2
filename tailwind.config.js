/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts}'],
    safelist: [
        'gray-1', 'gray-2', 'gray-3', 'gray-4', 'red-1', 'red-2', 'red-3', 'yellow-1', 'yellow-2', 'yellow-3', 'orange-1', 'orange-2', 'orange-3',
        'green-1', 'green-2', 'green-3', 'blue-1', 'blue-2', 'blue-3', 'teal-1', 'teal-2', 'teal-3', 'indigo-1', 'indigo-2', 'indigo-3',
        'theme-blue-1', 'theme-blue-2', 'theme-blue-3', 'theme-teal-1', 'theme-teal-2', 'theme-teal-3',
        "b-gray-1", "b-gray-2", "b-gray-3", "b-gray-4", "b-red-1", "b-red-2", "b-red-3", "b-yellow-1", "b-yellow-2", "b-yellow-3", "b-orange-1", 
        "b-orange-2", "b-orange-3", "b-green-1", "b-green-2", "b-green-3", "b-blue-1", "b-blue-2", "b-blue-3", "b-teal-1", "b-teal-2", "b-teal-3", 
        "b-indigo-1", "b-indigo-2", "b-indigo-3", "b-theme-blue-1", "b-theme-blue-2", "b-theme-blue-3", "b-theme-teal-1", "b-theme-teal-2", "b-theme-teal-3"
    ],
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
                    '10%, 90%': {
                        transform: 'translate3d(-1px, 0, 0)',
                        'animation-timing-function': 'cubic-bezier(.36,.07,.19,.97)'
                    },
                    '20%, 80%': {
                        transform: 'translate3d(2px, 0, 0)',
                        'animation-timing-function': 'cubic-bezier(.36,.07,.19,.97)'
                    },
                    '30%, 50%, 70%': {
                        transform: 'translate3d(-4px, 0, 0)',
                        'animation-timing-function': 'cubic-bezier(.36,.07,.19,.97)'
                    },
                    '40%, 60%': {
                        transform: 'translate3d(4px, 0, 0)',
                        'animation-timing-function': 'cubic-bezier(.36,.07,.19,.97)'
                    }
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
