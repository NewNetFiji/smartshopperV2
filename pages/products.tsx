import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { withUrqlClient } from "next-urql";
import React from "react";
import Footer from "../src/components/ui/footer";
import Header from "../src/components/ui/Header";
import { createUrqlClient } from "../src/utils/createUrqlClient";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

export const Products = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main>
        <Container className={classes.root} maxWidth="lg">
          <Typography variant="h2">Products Page</Typography>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default withUrqlClient(createUrqlClient)(Products);
