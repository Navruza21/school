import React, { useContext, useState } from "react";
import {
  styled,
  useTheme,
  Theme,
  CSSObject,
  Box,
  CssBaseline,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { RouterContext } from "../../App";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiStudent } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
// import MenuIcon from "@mui/icons-material/Menu";
import { IoIosMenu } from "react-icons/io";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Journal from "../../pages/journal";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Layout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const { activePage, setActivePage } = useContext(RouterContext);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LuLayoutDashboard />,
    },
    {
      title: "Classes",
      icon: <MdGroups />,
    },
    {
      title: "Teachers",
      icon: <FaChalkboardTeacher />,
    },
    {
      title: "Students",
      icon: <PiStudent />,
    },
    {
      title: "Journal",
      icon: <PiStudent />,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: "none" }) }}
          >
            <IoIosMenu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          ".MuiPaper-root": {
            background: (theme) => theme.palette.primary.dark,
            color: "white",
          },
        }}
      >
        <DrawerHeader>
          <Typography className="flex-1 pl-3" sx={{ fontWeight: "bold" }}>
            School Admin
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {<ChevronLeftIcon style={{ color: "white" }} />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map(({ title, icon }, index) => (
            <ListItem
              key={title}
              disablePadding
              sx={{ display: "block", color: "white" }}
              onClick={() => setActivePage(title)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <main>{children}</main>
      </Box>
    </Box>
  );
}
