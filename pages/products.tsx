import { TextField, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { TextFields } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import { withUrqlClient } from "next-urql";
import React from "react";
import { ProductCard } from "../src/components/product/NewProdCard";
import Footer from "../src/components/ui/footer";
import Header from "../src/components/ui/Header";
import { Product, useCountProductsQuery, useFullProductsQuery } from "../src/generated/graphql";
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
  search: {
    marginBottom: theme.spacing(2),
  }
  
}));


export const Products = () => {
  const classes = useStyles();

  const [countProducts] = useCountProductsQuery()
  const count = countProducts

  const pages = ( count.data?.countProducts? Math.round(count.data?.countProducts/12) : 0 )
  const [{ data, fetching }] = useFullProductsQuery({
    variables: {
      limit: 12,
    },
  });

  const [page, setPage] = React.useState(1);  

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(value)
    setPage(value);
    console.log("page: ", page)
  };

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
        {/* <Hero /> */}

        <Container className={classes.cardContainer} maxWidth="lg">
          
          <TextField className={classes.search} id="search" label="Search field" type="search" variant="outlined" fullWidth />
          <Pagination page={page} onChange={handleChange} className={classes.search} count={pages} color="primary" />
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
