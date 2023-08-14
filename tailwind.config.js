/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            flexBasis: {
                '1/8': '12.5%',
                '2/8': '25%',
                '3/8': '37.5%',
                '4/8': '50%',
                '5/8': '62.5%',
                '6/8': '75%',
                '7/8': '87.5%',
            },
            boxShadow: {
                up: '0 4px 15px 0px rgba(0, 0, 0, 0.3)',
            },
            width: {
                button: '40px',
            },
            height: {
                button: '40px',
            },
            minHeight: {
                item: '58px',
            },
        },
    },
    plugins: [],
};
