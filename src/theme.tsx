import { cyan, deepOrange, orange, teal } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    reactNoteCustom: {
      appBarHeight: string;
      boradBarHeight: string;
      boardContentHeight: string;
    };
  }

  interface ThemeOptions {
    reactNoteCustom?: {
      appBarHeight?: string;
      boradBarHeight?: string;
      boardContentHeight?: string;
    };
  }
}

const APP_BAR_HEIGHT = "58px";
const BOARD_BAR_HEIGHT = "60px";
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;

// A custom theme for this app
const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "*::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#dcddd1",
            borderRadius: "8px",
          },
          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "white",
            borderRadius: "8px",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.MuiTypography-body1": {
            fontSize: "0.875rem",
          },
        },
      },
      defaultProps: {
        variantMapping: {
          h1: "h2",
          h2: "h2",
          h3: "h2",
          h4: "h2",
          h5: "h2",
          h6: "h2",
          subtitle1: "h2",
          subtitle2: "h2",
          body1: "span",
          body2: "span",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderWidth: "0.5px",
          "&:hover": {
            borderWidth: "0.5px",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            // color: theme.palette.primary.main,
            fontSize: "0.875rem",
          };
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            // color: theme.palette.primary.main,
            // fontSize: "0.875rem",
            // ".MuiOutlinedInput-notchedOutline": {
            //   borderColor: theme.palette.primary.light,
            // },
            // "&:hover": {
            //   ".MuiOutlinedInput-notchedOutline": {
            //     borderColor: theme.palette.primary.main,
            //   },
            // },
            "& fieldset": {
              borderWidth: "0.5px !important",
            },
            "&:hover fieldset": {
              borderWidth: "1px !important",
            },
            "&.Mui-focused fieldset": {
              borderWidth: "1px !important",
            },
          };
        },
      },
    },
  },
  reactNoteCustom: {
    appBarHeight: APP_BAR_HEIGHT,
    boradBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
  },
  colorSchemes: {
    light: {
      // palette: {
      //   primary: teal,
      //   secondary: deepOrange,
      // },
    },
    dark: {
      // palette: {
      //   primary: cyan,
      //   secondary: orange,
      // },
    },
  },
});

export default theme;
