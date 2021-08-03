import { Box, Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { Layout } from "../src/components/Layout";
import { CreateProductForm } from "../src/components/product/createProductForm";
import ProductMaster from "../src/components/product/ProductMaster";
import { Product, useMeQuery } from "../src/generated/graphql";
import theme from "../src/theme";
import { createUrqlClient } from "../src/utils/createUrqlClient";
import { useIsAuth } from "../src/utils/useIsAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  gridContainer: {
    height: "100%",
  },
  pane: {
    padding: 0,
    margin: 0,
    alignItems: "stretch",
  },
}));

export const Products: React.FC<{}> = () => {
  useIsAuth();
  const classes = useStyles();
  const [{ data: meData, fetching }] = useMeQuery();
  
  const [detail, setDetail] = useState<{
    [x: string]: string | number;
}>()

  const vendorId = meData?.me?.vendorId;

  const handleCellClick =
    (item: {
      [x: string]: string | number;
  }) => (e: React.MouseEvent<HTMLTableRowElement>) => {
      setDetail(item);
    };

  return (
    <Layout>
      <main>
        <Container className={classes.root} maxWidth="lg">
          <Grid container className={classes.gridContainer}>
            <Grid item xs={4} className={classes.pane}>
              {/* <Box
                border={1}
                borderRadius={5}
                borderColor={theme.palette.grey[300]}
                height="100%"
                marginTop={3}
                marginRight={3}
                padding={0}
              > */}
              {fetching ? (
                <div>Loading...</div>
              ) : (
                <ProductMaster vendorId={vendorId as number} handleCellClick={handleCellClick} />
              )}

              {/* </Box> */}
            </Grid>
            <Grid item xs={8}>
              <Box
                border={1}
                borderRadius={5}
                borderColor={theme.palette.grey[300]}
                height="100%"
                marginTop={3}
              >
                <CreateProductForm item={detail as unknown as Product}/>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </main>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Products);
