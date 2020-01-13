import { createMuiTheme } from "@material-ui/core/styles";

export const MUITheme = createMuiTheme({
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    text: {
      primary: "#666",
      secondary: "#fff",
      disabled: "#D6D6D6",
      red: "#D0021B",
      darkGrey: "#212121",
      lightGrey: "#9b9b9b",
      footerText: "#FFFFE1",
      white: "#fff",
      hover: {
        blue: "#005ACB",
        red: "#D0021B",
        black: "#333",
      },
    },
    primary: {
      main: "#4086ff",
      dark: "#005ACB",
    },
    secondary: {
      main: "#E67381",
      dark: "#D0021B",
    },
    purple: {
      main: "#220D3A",
      light: "#412f55",
    },
    background: {
      disabled: { gray: "#D6D6D6" },
      hover: {
        blue: "#ecf3fe",
        red: "#D0021B",
        black: "#333",
      },
      grey: "#D6D6D6",
      mainContent: "#fafafa",
      footer: "#211D24",
      white: "#fff",
      black: "#333",
      red: "#D0021B",
      succesBox: "#E7FFF8",
      alertBox: "#FDE5E8",
      warningBox: "#FDF3E5",
      infoBox: "#DEEAFF",
    },
    border: {
      primary: "#f5f7f8",
      mainContent: "#fafafa",
      alertBox: "#E67381",
      warningBox: "#F18D5A",
      grey: "#D6D6D6",
    },
    success: "#00C48C",
    error: { main: "#B00020" },
    infoBoxLink: "#067AD7",
    warning: "#F18D5A",
  },
  typography: {
    fontFamily: "Muli",
    h2: {
      color: "#212121",
      fontSize: 36,
      fontWeight: 600,
      lineHeight: "45px",
    },
    h3: {
      color: "#212121",
      fontSize: 32,
      fontWeight: 600,
      letterSpacing: -0.5,
      lineHeight: "32px",
    },
    h4: {
      color: "#212121",
      fontSize: 24,
      fontWeight: 600,
      lineHeight: "30px",
    },
    h5: {
      color: "#212121",
      fontSize: 22,
      fontWeight: 600,
      lineHeight: "32px",
    },
    h6: {
      color: "#212121",
      fontSize: 20,
      fontWeight: 600,
      lineHeight: "25px",
    },
    body1: {
      color: "#9b9b9b",
      fontSize: 24,
      lineHeight: "30px",
    },
    body2: {
      color: "#616161",
      fontSize: 18,
      lineHeight: "28px",
    },
    subtitle1: {
      color: "#212121",
      fontSize: 18,
      fontWeight: "bold",
    },
    subtitle2: {
      color: "#666",
      fontSize: 14,
      lineHeight: "21px",
    },
  },
});

export default MUITheme;
