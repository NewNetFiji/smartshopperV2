import {
  Backdrop,
  Button,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { Product, useGetProductsQuery } from "../../generated/graphql";
import { CustomSearchBar } from "../ui/CustomSearchBar";
import { ProductCard } from "./NewProdCard";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cart: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
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


export const Products: React.FC = () => {
  const classes = useStyles();

  const [variables, setVariables] = useState({
    limit: 48,
    cursor: null as null | undefined | string,
    filterString: null as null | undefined | string,
  });

  const [{ data, fetching }] = useGetProductsQuery({
    variables,
  });

  console.log("variables parent: ", variables);

  let body = null;
  if (data) {
    body = (
      <>
        {data.getProducts.products?.map((product, indx) => (
          <Grid item key={indx} xs={12} sm={3}>
            <ProductCard              
              data={product as Product}
            />
          </Grid>
        ))}
      </>
    );
  }

  return (
    <React.Fragment>
      <main>
        <Container className={classes.cardContainer} maxWidth="lg">
          <CustomSearchBar variables={variables} setVariables={setVariables}/>

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
                      filterString: variables.filterString
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
    </React.Fragment>
  );
};

export default Products;
