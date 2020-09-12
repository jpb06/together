import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";

import { userSelector } from "../../../redux/selectors";
import { TerseUser } from "../../../types/shared";
import Logo, { LogoColor } from "../../generic/logo/Logo";
import UserAvatar from "../../generic/user-avatar/UserAvatar";
import SideMenu from "./SideMenu";
import styles from "./TopMenu.styles";

const TopMenu = () => {
  const classes = styles();

  const user = useSelector(userSelector) as TerseUser;
  const [isSiderOpen, setIsSiderOpen] = React.useState(false);

  const toggleDrawer = (isOpen: boolean) => (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => setIsSiderOpen(isOpen);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} aria-label="appbar">
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
