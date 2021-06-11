import {
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import Hero from "../src/components/product/hero";
import { ProductCard } from "../src/components/product/NewProdCard";
import Footer from "../src/components/ui/footer";
import Header from "../src/components/ui/Header";
import { Product, useFullProductsQuery } from "../src/generated/graphql";
import { createUrqlClient } from "../src/utils/createUrqlClient";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardContainer: {
    flexGrow: 1,
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  searchBar: {    
    width: "100%",
    marginBottom: theme.spacing(3)
  }
}));

const Index = () => {
  const classes = useStyles();
  const [{ data, fetching }] = useFullProductsQuery({
    variables: {
      limit: 12,
    },
  });

  let body = null;
  if (data) {
    body = (
      <>
        {data.fullProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={3}>
            <ProductCard data={product as Product} />
          </Grid>
        ))}
      </>
    );
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main>
        <Hero />
        <Container className={classes.cardContainer}>
          <Grid id="searchF" container spacing={2}>
            <Grid className={classes.searchBar} item xs={12} >
              <TextField
                id="search"
                label="Search Products"
                type="search"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid container spacing={2} >
              {fetching && !data ? (
                <div>
                  <Typography variant="body1">Loading...</Typography>
                </div>
              ) : (
                body
              )}
            </Grid>
          </Grid>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
