import { makeStyles, fade } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: 'url("/static/images/background/background14.jpg")',
    backgroundSize: "cover",
  },
  form: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  card: {
    width: "100%",
    maxWidth: 350,
    paddingBottom: theme.spacing(2),
    backgroundColor: fade(theme.palette.background.default, 0.83),
  },
  media: {
    height: 160,
  },
  actions: {
    paddingTop: 0,
    justifyContent: "center",
  },
  newAccount: {
    paddingTop: 10,
    textAlign: "center",
    color: theme.palette.primary.main,
  },
}));

export default useStyles;
