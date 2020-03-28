import { makeStyles } from "@material-ui/core";

const styles = makeStyles(theme => ({
  container: {
    padding: "0 0 8px",
    marginLeft: 12,
    flex: "1 1 auto"
  },
  lifeLine: {
    minHeight: 24,
    borderLeftStyle: "solid",
    borderLeftWidth: 1,
    display: "block",
    borderColor: "#757575"
  }
}));

export default styles;
