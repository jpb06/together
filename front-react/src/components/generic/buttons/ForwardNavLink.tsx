import React from "react";
import { NavLink } from "react-router-dom";

// https://github.com/mui-org/material-ui/issues/15903
const ForwardNavLink = React.forwardRef((props: any, ref: any) => (
  <NavLink {...props} name="forward-nav-link" innerRef={ref} />
));

export default ForwardNavLink;
