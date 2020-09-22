import clsx from "clsx";
import React from "react";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import EventIcon from "@material-ui/icons/Event";
import ShareIcon from "@material-ui/icons/Share";
import StyleIcon from "@material-ui/icons/Style";
import TimelineIcon from "@material-ui/icons/Timeline";

import Logo, { LogoColor } from "../../generic/logo/Logo";
import styles from "./SideMenu.styles";
import SideMenuItem from "./SideMenuItem";

interface SideMenuProps {
  isOpen: boolean;
  toggleDrawer: (
    open: boolean
  ) => (event: React.SyntheticEvent<{}, Event>) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, toggleDrawer }) => {
  const classes = styles();

  return (
    <SwipeableDrawer
      open={isOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <div
        className={clsx(classes.fullList, classes.sideMenu)}
        role="presentation"
      >
        <Logo color={LogoColor.Primary} />
        <List>
          <SideMenuItem
            menuText="Daily"
            fullText="Daily"
            to="/daily"
            IconComponent={EventIcon}
          />
          <SideMenuItem
            menuText="Sprint"
            fullText="Sprint"
            to="/sprint"
            IconComponent={DirectionsRunIcon}
          />
          <SideMenuItem
            menuText="Team"
            fullText="Team"
            to="/team"
            IconComponent={ShareIcon}
          />
          <SideMenuItem
            menuText="Stats"
            fullText="Stats"
            to="/stats"
            IconComponent={TimelineIcon}
          />
        </List>
        <Divider />
        <List>
          <SideMenuItem
            menuText="Switch"
            fullText="Switch team"
            to="/switchteam"
            IconComponent={StyleIcon}
          />
        </List>
      </div>
    </SwipeableDrawer>
  );
};

export default SideMenu;
