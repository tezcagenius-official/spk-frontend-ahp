import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export interface ISidebarList {
  name: string;
  icon: IconDefinition;
  link: string;
}
