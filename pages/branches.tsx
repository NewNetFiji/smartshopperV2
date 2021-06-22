import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withUrqlClient } from "next-urql";
import React from 'react';
import { Layout } from '../src/components/Layout';
import { Copyright } from '../src/components/ui/copyright';
import Header from '../src/components/ui/Header';
import { createUrqlClient } from "../src/utils/createUrqlClient";



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  }
}));

export const Branches =() => {
  const classes = useStyles();

  return (
    <Layout>
    <div className={classes.root}>      
      <Container component="main" className={classes.main} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Branches
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'Pin a footer to the bottom of the viewport.'}
          {'The footer will move as the main element of the page grows.'}
        </Typography>
        <Typography variant="body1">Sticky footer placeholder.</Typography>
      </Container>
      
    </div>
    </Layout>
  );
}

export default withUrqlClient(createUrqlClient)(Branches)