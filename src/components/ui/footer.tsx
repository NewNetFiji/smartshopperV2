import { Button, Grid, Link, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Copyright } from "./copyright";
import { deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    //padding: theme.spacing(6),
  },
  copyRight: {
    backgroundColor: deepPurple[300],
  },
  cursive: {
    fontFamily: "Lobster",
  },
}));

export default function Footer() {
  const classes = useStyles();
  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();

  return (
    <React.Fragment>
      <footer className={classes.root}>
        <Grid container>
          <Grid style={{ backgroundColor: deepPurple[200] }} container>
            <Grid style={{ margin: "auto" }} item xs={4}>
              <Grid container>
                <Grid item style={{ width: "100%" }}>
                  <Typography
                    variant="h6"
                    align="center"
                    gutterBottom
                    className={classes.cursive}
                  >
                    Smart Shopper Fiji is a 100% Fijian Owned Platform
                  </Typography>
                </Grid>
                <Grid item xs={12} >
                  <Grid container style={{ flexGrow: 1, flexDirection: "row" }}>
                    <Typography
                      style={{ fontFamily: "Raleway" }}
                      variant="body1"
                      align="center"
                      component="div"
                    >
                      <Grid item style={{width: "100%"}} xs={4}>
                        <Link href="#" onClick={preventDefault} variant="body2">
                          About Us
                        </Link>
                      </Grid>
                      <Grid item style={{width: "100%"}} xs={4}>
                        <Link href="#" onClick={preventDefault} variant="body2">
                          Contact Us
                        </Link>
                      </Grid>
                      <Grid item style={{width: "100%"}} xs={4}>
                        <Link href="#" onClick={preventDefault} variant="body2">
                          Location
                        </Link>
                      </Grid>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.copyRight} item xs={12}>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"              
            >
              Helping Fijians make smarter shopping choices!
            </Typography>
            <Copyright />
          </Grid>
        </Grid>
      </footer>
    </React.Fragment>
  );
}
