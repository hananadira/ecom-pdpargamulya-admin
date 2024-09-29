/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT ({
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/flowbite/**/*.js',
    // flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // flowbite.plugin(),
    require('flowbite/plugin') 
  ],
})

