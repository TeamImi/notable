import { createMuiTheme } from "@material-ui/core/styles";
import { BreakpointOverrides } from "@material-ui/core/styles/createBreakpoints";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    tablet: true;
  }
}
