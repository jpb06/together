import { makeStyles } from "@material-ui/core";

const styles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3),
    height: "100%",
    opacity: 0.87
  },
  centered: {
    textAlign: "center"
  },
  userName: {
    fontSize: "1.5rem",
    marginTop: theme.spacing(1)
  },
  userMail: {
    color: theme.palette.primary.main
  },
  action: {
    width: "100% !important",
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
    justifyContent: "start"
  },
  actionIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default styles;
