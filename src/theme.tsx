import { cyan, deepOrange, orange, teal } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
// A custom theme for this app
const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange,
      },
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange,
      },
    },
  },
});

export default theme;
