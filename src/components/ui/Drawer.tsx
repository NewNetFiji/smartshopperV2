import {
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
  ListItemText,
  makeStyles,
  Avatar,
  ListItemIcon,
  Typography,
  LinearProgress,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { MeQuery, useLogoutMutation, User } from "../../generated/graphql";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ChatIcon from "@material-ui/icons/Chat";
import { useRouter } from "next/router";
import { isServer } from "../../utils/isServer";

interface drawerProps {
  data: MeQuery | undefined;
}

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  avatar: {
    marginLeft: "50px",
    marginRight: "25px",
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
  },
  face: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function getInitials(data: User) {
  let firstChar;
  let secondChar;

  if (!data) {
    return "00";
  }
  if (data?.firstName.length > 0) {
    firstChar = data?.firstName.charAt(0).toUpperCase();
  } else {
    firstChar = "0";
  }
  if (data?.lastName.length > 0) {
    secondChar = data?.lastName.charAt(0).toUpperCase();
  } else {
    secondChar = "0";
  }
  firstChar = firstChar + secondChar;

  return firstChar;
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getName(user: User) {
  if (!user) {
    return "";
  } else {
    return (
      capitalizeFirstLetter(user.lastName) +
      ", " +
      capitalizeFirstLetter(user.firstName)
    );
  }
}

export const Drawer: React.FC<drawerProps> = ({ data }) => {
  const router = useRouter();
  const classes = useStyles();
  const [fetching, logout] = useLogoutMutation();
  const [state, setState] = useState(false);
  const initials = getInitials(data?.me as User);

  const handleClick = () => {
    logout();
    if (!isServer()) { router.push("/") };
  };
  const name: string = getName(data?.me as User);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Divider />
      <div className={classes.face}>
        <div>
          <Avatar alt="alt" src={`https://robohash.org/${name}?700x700`} />
        </div>
        <div>
          <Typography variant="h6">{name}</Typography>
        </div>
      </div>
      <Divider />
      <List>
        <ListItem button key="Profile">
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button key="Messages">
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Messages" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem onClick={handleClick} button key="Logout">
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
      {fetching.fetching ? <LinearProgress color="secondary" /> : <Divider />}
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <Avatar className={classes.avatar} onClick={toggleDrawer(true)}>
          {initials}
        </Avatar>
        <SwipeableDrawer
          anchor="right"
          open={state}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list()}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};
