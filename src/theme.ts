import { createMuiTheme } from "@material-ui/core";
import { lightGreen, blue  } from "@material-ui/core/colors";
import { Palette } from "@material-ui/icons";
import { CSSProperties } from "@material-ui/styles";
import { ThemeConsumer } from "styled-components";

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
  // palette: {
  //   primary: blue,
  //   secondary: lightGreen,
  // },
  // typography: {
  //   tab: {
  //     fontFamily: "Roboto",
  //     textTransform: "none",
  //     fontWeight: 700,
  //     fontSize: "1rem",
  //   },
  //   estimate: {
  //     fontFamily: "Pacifico",
  //     fontSize: "1rem",
  //     textTransform: "none",
  //     color: "white",
  //   },
  // },
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'      
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
    text: {
      primary: "#000000",
      secondary: "#f4f5fd"
    }    
  },  
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
});
