import { makeStyles } from "@material-ui/core";

const styles = makeStyles(theme => ({
  padding: {
    padding: 10,
    textAlign: "center"
  },
  inviteUser: {
    width: 35,
    height: 35
  },
  text: {
    color: theme.palette.primary.main,
    marginTop: theme.spacing(1)
  }
}));

export default styles;
