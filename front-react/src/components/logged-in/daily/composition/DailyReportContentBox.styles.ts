import { makeStyles } from "@material-ui/core";

const styles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1),
    height: "100%",
    display: "flex",
    flexDirection: "column",
    opacity: 0.87
  },
  media: {
    height: 7
  },
  content: {
    paddingTop: theme.spacing(1),
    marginTop: "auto"
  },
  defaultState: {
    backgroundColor: theme.palette.primary.main
  },
  validationUnset: {
    backgroundColor: theme.palette.secondary.main
  },
  validationSet: {
    backgroundColor: "green"
  },
  cardHeader: {
    paddingBottom: 0
  }
}));

export default styles;
