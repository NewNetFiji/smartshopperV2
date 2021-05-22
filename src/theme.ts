import { createMuiTheme } from "@material-ui/core";
import { amber, deepPurple } from "@material-ui/core/colors";
import { CSSProperties } from "@material-ui/styles";

declare module "@material-ui/core/styles/createTypography" {
  interface Typography {
    tab: CSSProperties;
    estimate: CSSProperties;
  }
  interface TypographyOptions {
    tab: CSSProperties;
    estimate: CSSProperties;
  }
}

declare module "@material-ui/core/Typography/Typography" {
  interface TypographyPropsVariantOverrides {
    tab: true;
    estimate: true;
  }
}

export default createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: amber,
  },
  typography: {
    tab: {
      fontFamily: "Roboto",
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1rem",
    },
    estimate: {
      fontFamily: "Pacifico",
      fontSize: "1rem",
      textTransform: "none",
      color: "white",
    },
  },
});
