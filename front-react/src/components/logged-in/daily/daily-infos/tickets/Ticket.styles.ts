import { makeStyles } from "@material-ui/core";

const styles = makeStyles(theme => ({
  user: {
    color: theme.palette.primary.main,
    paddingLeft: theme.spacing(1)
  },
  avatarContainer: {
    minWidth: 45
  }
}));

export default styles;
