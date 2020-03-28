import { makeStyles } from "@material-ui/core";

const styles = makeStyles(theme => ({
  dailyItem: {
    marginLeft: "-20px",
    width: "auto"
  },
  dailyItemIcon: {
    minWidth: 48
  },
  secondaryColor: {
    backgroundColor: theme.palette.secondary.main
  },
  title: {
    color: theme.palette.primary.main
  }
}));

export default styles;
