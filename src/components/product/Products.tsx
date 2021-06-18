import {
  Backdrop,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { Product, useGetProductsQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import Footer from "../ui/footer";
import Header from "../ui/Header";
import { ProductCard } from "./NewProdCard";

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
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export const Products = () => {
  const classes = useStyles();

  // const [countProducts] = useCountProductsQuery();

  // const count = countProducts;
  // const pages = count.data?.countProducts
  //   ? Math.round(count.data?.countProducts / 12)
  //   : 0;
  // const [page, setPage] = React.useState(1);

  const [variables, setVariables] = useState({
    limit: 48,
    cursor: null as null | undefined | string,
  });
  const [{ data, fetching }] = useGetProductsQuery({
    variables,
  });

  // const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
  //   setPage(value);
  // };

  let body = null;
  if (data) {
    body = (
      <>
        {data.getProducts.products?.map((product) => (
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
        <Container className={classes.cardContainer} maxWidth="lg">
          <TextField
            className={classes.search}
            id="search"
            label="Search field"
            type="search"
            variant="outlined"
            fullWidth
          />
          {/* <Pagination
            page={page}
            onChange={handleChange}
            className={classes.search}
            count={pages}
            color="primary"
          /> */}
          <Grid container spacing={2}>
            {fetching && !data ? (
              <div>
                <Typography variant="body1">Loading...</Typography>
              </div>
            ) : (
              body
            )}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                fullWidth
                disabled={!data?.getProducts.hasMore}
                onClick={() =>
                  setVariables({
                    limit: variables.limit,
                    cursor:
                      data?.getProducts.products[
                        data.getProducts.products.length - 1
                      ].createdAt,
                  })
                }
              >
                Load More...
              </Button>
            </Grid>
          </Grid>
        </Container>
      </main>
      <Backdrop className={classes.backdrop} open={fetching}>
        <CircularProgress color="primary" />
      </Backdrop>
      <Footer />
    </React.Fragment>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Products);
