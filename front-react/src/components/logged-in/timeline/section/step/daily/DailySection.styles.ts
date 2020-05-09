import { makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  dailyItem: {
    marginLeft: -20,
    width: "auto",
  },
  dailyItemIcon: {
    minWidth: 48,
  },
  secondaryColor: {
    backgroundColor: theme.palette.secondary.main,
  },
  fullWidth: {
    width: "100%",
  },
  title: {
    fontSize: "1rem",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: "1.5",
    letterSpacing: "0.00938em",
    color: theme.palette.primary.main,
    marginBottom: 5,
    display: "inline-block",
  },
}));

export default styles;
