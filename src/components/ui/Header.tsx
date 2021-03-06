import {
  Badge,
  Box,
  Drawer,
  Grid,
  IconButton,
  Slide,
  Typography
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  Product,
  useLogoutMutation,
  useMeQuery,
  UserRole
} from "../../generated/graphql";
import { ClientOnly } from "../../utils/ClientOnly";
import { isServer } from "../../utils/isServer";
import Cart from "../cart/Cart";
import { StyledButton } from "../cart/StyledButton.styles";
import { AdminDrawer } from "../menu/AdminDrawer";
import StyledLink from "./styledLink";

import {useCart, Item} from "../cart/store"

interface Props {
  children: React.ReactElement;
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    elevation: 0,
    backgroundColor: theme.palette.primary.light,
  },
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
    color: "inherit",
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
    overflowX: "auto",
    color: theme.palette.getContrastText("#ffffff"),
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
    color: theme.palette.getContrastText("#ffffff"),
  },
  headerButtons: {
    marginLeft: "auto",
    margin: theme.spacing(2),
    color: "primary",
  },
  imageIcon: {
    height: "100%",
  },
  iconRoot: {
    textAlign: "center",
  },
  shoppingCartIcon: {
    marginLeft: "25px",
    color: theme.palette.grey[500],
  },
  toolbarLayout: {
    display: "flex",
  },
}));

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

function HideOnScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={true} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Header() {
  const router = useRouter();
  const classes = useStyles();  
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [, logout] = useLogoutMutation();
  async function handleLogout() {
    await logout();
    if (!isServer()) {
      router.reload()
      router.push("/");
    }
  };
  
  const cartItems = useCart((state) => state.cartItems);
  
  const [cartOpen, setCartOpen] = useState(false);
  //const [cartItems, setCartItems] = useState([] as Product[]);

  const getTotalItems = (items: Item[]) =>
    items.reduce((ack: number, item) => ack + item.qty, 0);

  
  let body = null;
  if (fetching) {
    //data is loading
  } else if (!data?.me) {
    //user is not loged in
    body = (
      <div className={classes.headerButtons}>
        <Button
          className={classes.headerButtons}
          variant="outlined"
          color="primary"
          onClick={() => router.push("/signIn")}
        >
          Sign In
        </Button>
        <StyledLink
          color="primary"
          route="/register"
          msg="Don't have an account? Signup"
        />
      </div>
    );
  } else {
    //user Is loged in. check for vendor Roles
    const vendorRoles = [UserRole.Admin, UserRole.Data, UserRole.Super];
    if (data.me.roles.some((role) => vendorRoles.includes(role))) {
      body = (
        <React.Fragment>
          <StyledButton onClick={() => setCartOpen(true)}>
            <Badge badgeContent={getTotalItems(cartItems)} color="error">
              <AddShoppingCartIcon />
            </Badge>
          </StyledButton>

          <AdminDrawer data={data} />

          {/* <Drawer
            anchor="right"
            open={cartOpen}
            onClose={() => setCartOpen(false)}
          >
            <Cart
              cartItems={cartItems}
              addToCart={handleAddToCart}
              removeFromCart={handleRemoveFromCart}
            />
          </Drawer> */}
        </React.Fragment>
      );
    } else {
      body = (
        //user is logged in with general/customer role
        <React.Fragment>
          <IconButton className={classes.shoppingCartIcon}>
            <Badge badgeContent={getTotalItems(cartItems)} color="error">
              <AddShoppingCartIcon onClick={() => setCartOpen(true)} />
            </Badge>
          </IconButton>
          <Button
            className={classes.headerButtons}
            variant="text"
            color="primary"
            onClick={() => router.push("/orders")}
          >
            Orders
          </Button>
          <Button
            className={classes.headerButtons}
            variant="text"
            color="primary"
            onClick={handleLogout}
          >
            Sign Out
          </Button>

          <Drawer
            anchor="right"
            open={cartOpen}
            onClose={() => setCartOpen(false)}
          >
            <Cart />
          </Drawer>
        </React.Fragment>
      );
    }
  }

  return (
    <>
      <ClientOnly>
        <ElevationScroll>
          <HideOnScroll>
            <AppBar className={classes.appBar} position="fixed">
              <Toolbar disableGutters>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  alignContent="flex-end"
                >
                  <Grid item>
                    <Button
                      onClick={() => {
                        router.push("/");
                      }}
                      className={classes.logoContainer}
                    >
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
                  </Grid>
                  <Grid item>{body}</Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          </HideOnScroll>
        </ElevationScroll>
        <div className={classes.toolbarMargin} />
      </ClientOnly>
    </>
  );
}
