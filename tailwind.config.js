const PX0_100 = { ...Array.from(Array(101)).map((_, i) => `${i / 10}rem`) };

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*"],
  theme: {
    extend: {
      spacing: PX0_100,
      borderRadius: PX0_100,
      minWidth: PX0_100,
      maxWidth: PX0_100,
      minHeight: PX0_100,
      colors: {
        ui: {
          light: {
            1: "#f7f7f7",
            2: "#ececec",
            3: "#dfdfdf",
            4: "#a5a5a5",
            5: "#8b8b8b",
            6: "#6f6f6f",
            7: "#555555",
            8: "#333333",
            9: "#242424",
          },
          dark: {
            9: "#fbfbfb",
            8: "#dfdfdf",
            7: "#c1c1c1",
            6: "#a5a5a5",
            5: "#8b8b8b",
            4: "#8b8b8b",
            3: "#6f6f6f",
            2: "#333333",
            1: "#242424",
          },
        },
        gray: {
          100: "#f3f4f8",
        },
        primary: {
          light: {
            0: "#5086ff",
            1: "#9cbbff",
            2: "#eaf0ff",
            3: "#fbfcff",
          },
          dark: {
            0: "#628fff",
            1: "#b1caff",
          },
        },
      },
      fontSize: {
        "28-bold-140": ["2.8rem", { lineHeight: "1.4", fontWeight: 600 }],
        "22-bold-140": ["2.2rem", { lineHeight: "1.4", fontWeight: 600 }],
        "22-medium-140": ["2.2rem", { lineHeight: "1.4", fontWeight: 500 }],
        "20-medium-140": ["2.0rem", { lineHeight: "1.4", fontWeight: 500 }],
        "18-bold-140": ["1.8rem", { lineHeight: "1.4", fontWeight: 600 }],
        "16-bold-140": ["1.6rem", { lineHeight: "1.4", fontWeight: 600 }],
        "16-regular-140": ["1.6rem", { lineHeight: "1.4", fontWeight: 400 }],
        "14-medium-140": ["1.4rem", { lineHeight: "1.4", fontWeight: 500 }],
        "14-bold-140": ["1.4rem", { lineHeight: "1.4", fontWeight: 600 }],
        "14-regular-140": ["1.4rem", { lineHeight: "1.4", fontWeight: 400 }],
        "12-medium-160": ["1.2rem", { lineHeight: "1.6", fontWeight: 500 }],
        "12-regular-160": ["1.2rem", { lineHeight: "1.6", fontWeight: 400 }],
      },
    },
  },
  plugins: [],
};
