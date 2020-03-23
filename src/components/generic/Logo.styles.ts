import { makeStyles } from "@material-ui/core";

const styles = makeStyles(theme => ({
  container: {
    flexGrow: 1
  },
  logo: {
    fontWeight: "bold",
    textDecoration: "none"
  },
  logoColorPrimary: {
    color: theme.palette.primary.main
  },
  logoColorSecondary: {
    color: theme.palette.secondary.main
  },
  logoColorWhite: {
    color: "white"
  },
  normalFont: {
    fontSize: "x-large"
  },
  largeFont: {
    fontSize: "xx-large"
  }
}));

export default styles;
