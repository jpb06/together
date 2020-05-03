import { makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: 'url("/static/images/background/background1.jpg")',
    backgroundSize: "cover",
  },
  fixedWidth: {
    maxWidth: 700,
    padding: theme.spacing(1),
  },
  card: {
    opacity: 0.89,
    minWidth: "100%",
  },
  cardMedia: {
    height: 70,
  },
  cardContent: {
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
}));

export default styles;
