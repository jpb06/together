import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Logo, { LogoColor } from "../../generic/logo/Logo";
import { Link } from "react-router-dom";
import styles from "./TopMenu.styles";
import UserAvatar from "../../generic/user-avatar/UserAvatar";
import SideMenu from "./SideMenu";
import { useReduxSelector } from "../../../hooks/redux.hooks";

const TopMenu = () => {
  const classes = styles();

  const user = useReduxSelector(state => state.user);
  const [isSiderOpen, setIsSiderOpen] = React.useState(false);

  const toggleDrawer = (isOpen: boolean) => (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsSiderOpen(isOpen);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Logo isCentered={false} color={LogoColor.Primary} />

          <Link to="/account" style={{ textDecoration: "none" }}>
            <UserAvatar user={user} />
          </Link>
        </Toolbar>
      </AppBar>

      <SideMenu isOpen={isSiderOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
};

export default TopMenu;
