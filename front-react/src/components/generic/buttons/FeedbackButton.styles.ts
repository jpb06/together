import { makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  fabButton: {
    minWidth: "100% !important",
    justifyContent: "left",
    textTransform: "none",
    marginTop: theme.spacing(1),
    height: "30px !important",
  },
  buttonIcon: {
    justifyContent: "left",
    lineHeight: 8,
    marginLeft: -12,
  },
  buttonText: {
    justifyContent: "center",
    width: "100%",
  },
}));

export default styles;
