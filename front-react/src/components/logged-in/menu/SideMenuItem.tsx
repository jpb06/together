import ForwardNavLink from "./../../generic/buttons/ForwardNavLink";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import React from "react";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";

interface SideMenuItemProps {
  to: string;
  menuText: string;
  fullText: string;
  IconComponent: OverridableComponent<SvgIconTypeMap>;
}

const SideMenuItem: React.FC<SideMenuItemProps> = ({
  to,
  menuText,
  fullText,
  IconComponent
}) => {
  return (
    <ListItem
      button
      key={menuText}
      component={ForwardNavLink}
      to={to}
      activeClassName={"Mui-selected"}
    >
      <ListItemIcon>
        <IconComponent />
      </ListItemIcon>
      <ListItemText primary={fullText} />
    </ListItem>
  );
};

export default SideMenuItem;
