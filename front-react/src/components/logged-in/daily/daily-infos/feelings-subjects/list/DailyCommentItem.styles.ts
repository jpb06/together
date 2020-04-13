import { makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  user: {
    color: theme.palette.primary.main,
    paddingRight: theme.spacing(1),
  },
  breakWord: {
    wordBreak: "break-word",
  },
  avatarContainer: {
    minWidth: 45,
  },
}));

export default styles;
