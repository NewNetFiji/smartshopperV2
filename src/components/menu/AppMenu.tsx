import { createStyles, makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import CategoryIcon from "@material-ui/icons/Category";
import CollectionsIcon from "@material-ui/icons/Collections";
import IconDashboard from "@material-ui/icons/Dashboard";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import IconLibraryBooks from "@material-ui/icons/LibraryBooks";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import IconPeople from "@material-ui/icons/People";
import IconShoppingCart from "@material-ui/icons/ShoppingCart";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import React from "react";
import AppMenuItem from "./AppMenuItem";

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    appMenu: {
      width: "100%",
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
    },
    menuItemIcon: {
      color: theme.palette.primary.main,
    },
  })
);

const appMenuItems = [
  {
    name: "Dashboard",
    link: "/",
    Icon: IconDashboard,
  },
  {
    name: "Orders",
    link: "/orders",
    Icon: IconShoppingCart,
  },

  {
    name: "Catalog",
    Icon: IconLibraryBooks,
    items: [
      {
        name: "Products",
        link: "/products",
        Icon: LibraryAddIcon,
      },
      {
        name: "Categories",
        link: "/categories",
        Icon: CategoryIcon,
      },
      {
        name: "Collections",
        link: "/collections",
        Icon: CollectionsIcon,
      },
    ],
  },
  {
    name: "Customers",
    link: "/customers",
    Icon: SupervisorAccountIcon,
  },
  {
    name: "Discounts",
    link: "/discounts",
    Icon: MoneyOffIcon,
  },
  {
    name: "Users",
    link: "/users",
    Icon: IconPeople,
  },
];

const AppMenu: React.FC = () => {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.appMenu} disablePadding>
      {/* <AppMenuItem {...appMenuItems[0]} /> */}
      {appMenuItems.map((item, index) => (
        <AppMenuItem {...item} key={index} />
      ))}
    </List>
  );
};

export default AppMenu;
