import {
  Avatar, Divider, LinearProgress, List, ListItem, ListItemIcon, ListItemText,
  makeStyles, SwipeableDrawer, Typography
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MeQuery, useLogoutMutation, User } from "../../generated/graphql";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import { isServer } from "../../utils/isServer";
import AppMenu from "./AppMenu";
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
    color: "inherit",
    backgroundColor: theme.palette.primary.main,
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

export const AdminDrawer: React.FC<drawerProps> = ({ data }) => {
  const router = useRouter();
  const classes = useStyles();
  const [fetching, logout] = useLogoutMutation();
  const [state, setState] = useState(false);
  const initials = getInitials(data?.me as User);

  const handleCloseClick = () => {
    logout();
    if (!isServer()) {
      router.push("/");
    }
  };
  const name: string = getName(data?.me as User);

  const handleClick =
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
      id="drawerMenu"
      className={classes.list}
      role="presentation"
      // onClick={handleClick(false)}
      // onKeyDown={handleClick(false)}
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
      <AppMenu />
      <Divider />
      <List>
        <ListItem onClick={handleCloseClick} button key="Logout">
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
        <Avatar className={classes.avatar} onClick={handleClick(true)}>
          {initials}
        </Avatar>
        <SwipeableDrawer
          anchor="right"
          open={state}
          onClose={handleClick(false)}
          onOpen={handleClick(true)}
        >
          {list()}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};
