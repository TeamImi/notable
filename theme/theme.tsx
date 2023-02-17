import { Poppins } from "@next/font/google";
import { createTheme } from "@mui/material/styles";

export const poppins = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Roboto", "Arial", "sans-serif"],
});

export const theme = createTheme({
  palette: {},
  spacing: [0, 4, 8, 12, 16, 20, 24, 28, 32],
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      tablet: 768,
    },
  },
});
