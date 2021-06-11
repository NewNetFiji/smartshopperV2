import { Grid, makeStyles, Typography } from "@material-ui/core";
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
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <footer className={classes.root}>
        <Grid container>
          <Grid style={{ backgroundColor: deepPurple[200] }} container xs={12}>
            <Grid style={{ margin: "auto" }} item xs={4}>
              <Typography variant="h6" align="center" gutterBottom>
                Footer
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                color="textSecondary"
                component="p"
              >
                Something here to give the footer a purpose!
              </Typography>
            </Grid>
          </Grid>
          <Grid className={classes.copyRight} item xs={12}>
            <Copyright />
          </Grid>
        </Grid>
      </footer>
    </React.Fragment>
  );
}
