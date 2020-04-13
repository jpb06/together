import { makeStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { fade } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  root: {
    marginRight: "-12px",
    marginBottom: "-5px",
  },
  actionInProgress: {
    position: "absolute",
    zIndex: 1,
    color: green[500],
    backgroundColor: fade(theme.palette.primary.contrastText, 0.3),
  },
  spinner: {
    position: "relative",
    top: 0,
    left: 0,
  },
}));

export default styles;
