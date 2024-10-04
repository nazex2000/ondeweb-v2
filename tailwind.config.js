const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,vue}",
    "./src/**/*",
    "./node_modules/@nextui-org/theme/dist/components/(date-picker|radio|button|ripple|spinner|calendar|date-input|popover).js"
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui()],
}