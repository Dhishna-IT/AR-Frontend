module.exports = {
  content: ["./*.{html,js}", "./!(build|dist|.*)/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans'],
        'headline-20pxbutton': ['Avenir', 'sans'],
        'subheadline-bold': ['"SF Pro Text"', 'sans'],
      },
      colors: {
        gray: "#111",
        border02: "#fff",
        glass01: "rgba(255, 255, 255, 0.05)",
        whitesmoke: "#e9e9e9",
      },
    },
  },
  plugins: [],
}
