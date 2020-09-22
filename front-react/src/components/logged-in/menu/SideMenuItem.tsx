import React from "react";

import { SvgIconTypeMap } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

import ForwardNavLink from "../../generic/buttons/ForwardNavLink";

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
  IconComponent,
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
        <IconComponent titleAccess={menuText} />
      </ListItemIcon>
      <ListItemText primary={fullText} />
    </ListItem>
  );
};

export default SideMenuItem;
