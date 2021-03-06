import React from "react";

import Slide from "@material-ui/core/Slide";

const DownTransition: React.FC = React.forwardRef((props: any, ref: any) => (
  <Slide direction="down" ref={ref} {...props} />
));

export default DownTransition;
