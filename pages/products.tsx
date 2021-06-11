import { Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { withUrqlClient } from "next-urql";
import React from "react";
import Hero from "../src/components/product/hero";
import { ProductCard } from "../src/components/product/NewProdCard";
import Footer from "../src/components/ui/footer";
import Header from "../src/components/ui/Header";
import { Product, useFullProductsQuery, useProductsQuery } from "../src/generated/graphql";
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
  card: {
    width: "200px"
  }
}));

export const Products = () => {
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
          <Grid item key={product.id} xs={12} sm={3} >
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
        {/* Hero unit */}

        <Hero />

        {/* End hero unit */}
        <Container className={classes.cardContainer} maxWidth="lg">
          <Grid container spacing={2}>
            {fetching && !data ? (
              <div>
                <Typography variant="body1">Loading...</Typography>
              </div>
            ) : (
              body
            )}
          </Grid>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Products);
