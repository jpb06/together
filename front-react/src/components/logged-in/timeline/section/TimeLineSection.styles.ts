import { makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  container: {
    display: "flex",
    padding: 24,
    flexDirection: "column",
    marginBottom: 15,
    opacity: 0.87,
  },
  title: {
    marginTop: 0,
    color: theme.palette.primary.main,
  },
}));

export default styles;
