import React from "react";
import Slide from "@material-ui/core/Slide";

const DownTransition: React.FunctionComponent<any> = React.forwardRef(
  (props: any, ref: any) => {
    return <Slide direction="down" ref={ref} {...props} />;
  }
);

export default DownTransition;
