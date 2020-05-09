import { makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  media: {
    height: 15,
  },
  fixedWidth: {
    maxWidth: 1000,
  },
}));

export default styles;
