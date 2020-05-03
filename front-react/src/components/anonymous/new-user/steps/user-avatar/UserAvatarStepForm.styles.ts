import { makeStyles } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";

const styles = makeStyles((theme) => ({
  centered: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: deepOrange[500],
    color: "white",
    marginTop: 25,
  },
  fullName: {
    marginBottom: 25,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default styles;
