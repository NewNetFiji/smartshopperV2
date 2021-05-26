import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { withUrqlClient } from "next-urql";
import React from "react";
import Hero from "../src/components/product/hero";
import { ProductCard } from "../src/components/product/productCard";
import Footer from "../src/components/ui/footer";
import Header from "../src/components/ui/Header";
import { useProductsQuery } from "../src/generated/graphql";
import { createUrqlClient } from "../src/utils/createUrqlClient";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));


export const Products = () => {
  const classes = useStyles();
  const [{ data }] = useProductsQuery();

  let body = null;
  if (data) {
    body = (
      <>
        {data.products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard data={product}/>
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
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {body}
          </Grid>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default withUrqlClient(createUrqlClient, {ssr: true})(Products);
