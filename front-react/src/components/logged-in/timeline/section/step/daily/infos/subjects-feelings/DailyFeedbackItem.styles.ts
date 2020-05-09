import { makeStyles } from "@material-ui/core";
import { amber } from "@material-ui/core/colors";

const styles = makeStyles((theme) => ({
  avatarContainer: {
    minWidth: 30,
    marginTop: 0,
    paddingRight: 3,
  },
  userName: {
    paddingLeft: 3,
  },
  feedbackType: {
    marginLeft: 2,
  },
  feedbackTitle: {
    marginLeft: -3,
  },
  feedbackText: {
    wordBreak: "break-word",
  },

  badge: {
    border: `2px solid ${theme.palette.background.paper}`,
    height: 22,
    width: 22,
    backgroundColor: amber[600],
  },
  badgeIcon: {
    width: 18,
    height: 18,
    backgroundColor: amber[600],
  },
}));

export default styles;
