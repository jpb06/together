import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#49a39f",
    },
    secondary: {
      main: "#0d3c59",
    },
    background: { paper: "darkslategray" },
  },
});

export default theme;
