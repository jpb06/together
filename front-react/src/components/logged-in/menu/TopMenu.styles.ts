import { makeStyles } from "@material-ui/core";

const styles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: theme.palette.secondary.main
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main
  }
}));

export default styles;
