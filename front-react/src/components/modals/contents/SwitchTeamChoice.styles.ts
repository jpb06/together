import { makeStyles } from "@material-ui/core";
import { amber } from "@material-ui/core/colors";

const styles = makeStyles(theme => ({
  teamItem: {
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    color: amber[300]
  },
  titlePrimary: {
    color: theme.palette.primary.main
  }
}));

export default styles;
