import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { useMeQuery } from "../../generated/graphql";
import { deepPurple } from "@material-ui/core/colors";
import { Box, Typography } from "@material-ui/core";
import { Drawer } from "../ui/Drawer";
import { isServer } from "../../utils/isServer";
import { useRouter } from "next/router";


interface Props {
  children: React.ReactElement;
}

const routes = [
  { title: "DashBoard", path: "/dashBoard" },
  { title: "Products", path: "/products" },
  { title: "Flyers", path: "/flyers" },
  { title: "Branches", path: "/branches" },
  { title: "Billing", path: "/billing" },
];

// Shared State
let lastValue: number;

function ElevationScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
  },
  logo: {
    height: "7em",
    textTransform: "none",
    [theme.breakpoints.down("md")]: {
      height: "6em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "4.4em",
    },
  },
  logoText: {
    fontFamily: "Carter One",
    fontStyle: "cursive",
    color: theme.palette.primary.contrastText,
    textTransform: "none",
    marginLeft: "10px",
    fontSize: "1.2rem",
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2rem",
    },
  },
  logoTxtContainer: {
    [theme.breakpoints.up("xs")]: {
      display: "none",
    },
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  logoContainer: {
    ...theme.typography.tab,
    marginTop: "4px",
    marginLeft: "10px",
    padding: 0,
  },
  tabContainer: {
    marginLeft: "auto",
    overflowX: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  avatar: {
    marginLeft: "50px",
    marginRight: "25px",
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  imageIcon: {
    height: "100%",
  },
  iconRoot: {
    textAlign: "center",
  },
}));

export default function Header() {
  const router = useRouter();
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    lastValue = value;
    setValue(newValue);
    router.push(routes[newValue].path);
  };

  useEffect(() => {
    if (window.location.pathname === "/dashBoard" && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === "/products" && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === "/flyers" && value !== 2) {
      setValue(2);
    } else if (window.location.pathname === "/branches" && value !== 3) {
      setValue(3);
    } else if (window.location.pathname === "/billing" && value !== 4) {
      setValue(4);
    } else if (window.location.pathname === "/login" && value !== 5) {
      setValue(5);
    }
  }, [value]);

  let body = null;
  if (fetching) {
    //data is loading
  } else if (!data?.me) {
    //user is not loged in
    if (!isServer()) { router.push("/signIn") };
  } else {
    //user Is loged in
    body = <Drawer data={data} />;
  }

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar disableGutters>
            <Button onClick={()=>{router.push("/")}} className={classes.logoContainer}>
              <div className={classes.logo}>
                <svg
                  height="100%"
                  viewBox="0 0 115 165"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 26V0L48.925 39V28.5C49.3647 18.5 59.0031 10 63.7674 7C66.3327 4.66667 75.7512 1 92.9024 5C110.054 9 114.341 22.3333 114.341 28.5V114.5L92.9024 99V28.5C84.5467 18.5 75.1282 24.3333 71.4634 28.5V83.5L0 26Z"
                    fill="#94B91B"
                  />
                  <path
                    d="M114.341 138.5V164.5L65.4165 125.5V136C64.9767 146 55.3383 154.5 50.5741 157.5C48.0088 159.833 38.5902 163.5 21.439 159.5C4.2878 155.5 0 142.167 0 136V50L21.439 65.5V136C29.7947 146 39.2133 140.167 42.8781 136V81L114.341 138.5Z"
                    fill="#00589F"
                  />
                </svg>
              </div>
              <Box className={classes.logoTxtContainer}>
                <Typography className={classes.logoText}>
                  Smart Shopper Fj
                </Typography>
              </Box>
            </Button>
            <Tabs
              value={value}
              onChange={handleChange}
              className={classes.tabContainer}
            >
              {routes.map((route, value) => (
                <Tab className={classes.tab} key={value} label={route.title} />
              ))}
            </Tabs>

            {body}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
}
