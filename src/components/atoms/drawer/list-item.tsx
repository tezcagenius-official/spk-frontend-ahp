import { ISidebarList } from "@/interfaces/page/dashboard/ui.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CommonProps } from "@mui/material/OverridableComponent";
import { MouseEventHandler } from "react";

export const ListItemRow = ({
  item,
  open,
  onClick,
  iconClass,
  parentClass,
  isActive = false,
}: {
  item: ISidebarList;
  open: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  iconClass?: CommonProps["className"];
  parentClass?: CommonProps["className"];
  isActive?: boolean;
}) => {
  return (
    <div onClick={onClick}>
      <ListItem
        className={`${parentClass} px-2 py-1`}
        disablePadding
        sx={{ display: "block" }}
        dense
      >
        <div
          className={`${
            isActive ? "bg-neutral-700" : "text-neutral-500"
          } rounded-lg overflow-hidden`}
        >
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
              <FontAwesomeIcon
                className={`${iconClass} ${!isActive && "text-neutral-500"}`}
                size={open ? "lg" : "sm"}
                icon={item.icon}
              />
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
        </div>
      </ListItem>
    </div>
  );
};

export default ListItem;
