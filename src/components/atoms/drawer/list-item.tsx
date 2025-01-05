import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ISidebarList } from "@/interfaces/page/dashboard/ui.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const ListItemRow = ({
  item,
  open,
}: {
  item: ISidebarList;
  open: boolean;
}) => {
  return (
    <Link href={item.link}>
      <ListItem disablePadding sx={{ display: "block" }} dense>
        <ListItemButton
          sx={[
            {
              minHeight: 45,
              px: 2,
            },
            open
              ? {
                  justifyContent: "initial",
                }
              : {
                  justifyContent: "center",
                },
          ]}
        >
          <ListItemIcon
            sx={[
              {
                aspectRatio: "1/1",
                alignItems: "center",
                justifyContent: "center",
              },
              open
                ? {
                    mr: 1,
                  }
                : {
                    mr: "auto",
                  },
            ]}
            className="h-5"
          >
            <FontAwesomeIcon size={open ? "lg" : "sm"} icon={item.icon} />
          </ListItemIcon>
          <ListItemText
            primary={item.name}
            sx={[
              open
                ? {
                    opacity: 1,
                  }
                : {
                    opacity: 0,
                  },
            ]}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default ListItem;
