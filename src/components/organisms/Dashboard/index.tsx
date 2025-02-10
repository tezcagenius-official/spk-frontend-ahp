"use client";
import { AppBar } from "@/components/atoms/appbar";
import { Drawer } from "@/components/atoms/drawer";
import { DrawerHeader } from "@/components/atoms/drawer-header";
import { ListItemRow } from "@/components/atoms/drawer/list-item";
import BaseModal from "@/components/atoms/modal";
import {
  sidebarListCounter,
  sidebarListMain,
  sidebarListUser,
} from "@/constants/navigation/index.constant";
import { useLogoutUser } from "@/services/user/mutation";
import {
  faBolt,
  faChevronLeft,
  faChevronRight,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ListItem, ListItemButton, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export const DashboardPage: React.FC<
  Readonly<{
    children: React.ReactNode;
    role: string;
  }>
> = ({ children, role }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [modalOpened, setModalOpened] = useState<string>();
  const router = useRouter();
  const pathname = usePathname();
  const { mutate: mutateLogout } = useLogoutUser();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    mutateLogout(undefined);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed" color="default" open={open}>
          <Toolbar>
            <IconButton
              color="secondary"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  marginRight: 5,
                },
                open && { display: "none" },
              ]}
            >
              <FontAwesomeIcon size="1x" icon={faBolt} />
            </IconButton>
            <Typography className="grow" variant="h6" noWrap component="div">
              Dashboard SPK
            </Typography>
            <Typography variant="button" noWrap component="div">
              {role === "adm" ? "admin" : "super admin"}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton
              className="aspect-square rounded-full p-2 h-10"
              color="secondary"
              onClick={handleDrawerClose}
            >
              {theme.direction === "rtl" ? (
                <FontAwesomeIcon size="xs" icon={faChevronRight} />
              ) : (
                <FontAwesomeIcon icon={faChevronLeft} />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 45,
                    px: 2,
                  },
                  open
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                        display: "none",
                      },
                ]}
              >
                <p className="font-medium text-lg">Users</p>
              </ListItemButton>
            </ListItem>
            {sidebarListUser.map((item, index) => (
              <ListItemRow
                item={item}
                open={open}
                onClick={() => {
                  router.replace(item.link);
                }}
                isActive={pathname.includes(item.link)}
                key={`${item.name}-${index}`}
              />
            ))}
          </List>
          <Divider />
          <List>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 45,
                    px: 2,
                  },
                  open
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                        display: "none",
                      },
                ]}
              >
                <p className="font-medium text-lg">Dashboard</p>
              </ListItemButton>
            </ListItem>
            {sidebarListMain.map((item, index) => (
              <ListItemRow
                item={item}
                open={open}
                onClick={() => {
                  router.replace(item.link);
                }}
                isActive={pathname.includes(item.link)}
                key={`${item.name}-${index}`}
              />
            ))}
          </List>
          <Divider />
          <List>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 45,
                    px: 2,
                  },
                  open
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                        display: "none",
                      },
                ]}
              >
                <p className="font-medium text-lg">Perhitungan</p>
              </ListItemButton>
            </ListItem>
            {sidebarListCounter.map((item, index) => (
              <ListItemRow
                item={item}
                open={open}
                onClick={() => {
                  router.replace(item.link);
                }}
                isActive={pathname.includes(item.link)}
                key={`${item.name}-${index}`}
              />
            ))}
          </List>
          {!open && <Divider />}
          <div className="h-full flex items-end">
            <div className="w-full">
              <ListItemRow
                item={{
                  name: "Keluar",
                  icon: faPowerOff,
                  link: "/login",
                }}
                iconClass="!text-red-100"
                parentClass="bg-red-700 text-red-100 !p-0"
                onClick={(e) => {
                  setModalOpened("modal-keluar");
                }}
                open={open}
              />
            </div>
          </div>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {children}
        </Box>
      </Box>
      <BaseModal
        name="modal-keluar"
        activeModal={modalOpened}
        onClose={() => {
          setModalOpened(undefined);
        }}
      >
        <div>
          <div>Apakah anda yakin untuk keluar?</div>
          <div className="flex justify-end">
            <Button onClick={() => setModalOpened(undefined)} color="error">
              Batal
            </Button>
            <Button color="success" onClick={handleLogout}>
              Keluar
            </Button>
          </div>
        </div>
      </BaseModal>
    </>
  );
};
