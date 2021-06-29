import {
  Box,
  Container,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Layout } from "../../src/components/Layout";
import ProductTable from "../../src/components/product/ProductTable";
import TblControls from "../../src/components/ui/TblControls";
import { useVendorQuery } from "../../src/generated/graphql";
import theme from "../../src/theme";
import { createUrqlClient } from "../../src/utils/createUrqlClient";

interface props {}

// Shared State
let lastTab: number;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  center: {
    display: "flex",
    height: "100vh",
    alignContent: "center",
    justifyContent: "center",
  },
  file: {
    backgroundColor: "#F8F5E6",
    padding: 3,
    height: "100%",
    flexGrow: 1,
    marginTop: theme.spacing(5),
  },
  filePage: {
    justifyContent: "center",
    alignContent: "center",
    border: 1,
    height: "100%",
    width: "100%",
    padding: 5,
  },
  tabContainer: {
    marginLeft: "auto",
    overflowX: "auto",
    color: theme.palette.getContrastText("#ffffff"),
    marginTop: 5,
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    color: theme.palette.getContrastText("#ffffff"),
  },
}));

const vendorTabs = ["Details", "Products", "Reviews", "Map"];

export const Vendor: React.FC<props> = ({}) => {
  const classes = useStyles();
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [currentTabFocus, setCurrent] = useState(0);
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  
    const [{ data, fetching }] = useVendorQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  

  //   useEffect(() => {
  //     if (currentTabFocus != value ) {
  //       setValue(currentTabFocus);
  //     }
  //   }, [value]);

  const handleChange = (e: React.ChangeEvent<{}>, newTab: number) => {
    lastTab = value;
    setValue(newTab);
    setCurrent(newTab);    
  };

  if (fetching) {
    return (
      <Layout>
        <Grid container className={classes.center}>
          <Typography variant="h6"> Loading...</Typography>
        </Grid>
      </Layout>
    );
  }

  if (!data?.vendor) {
    return (
      <Layout>
        <Grid container className={classes.center}>
          <Typography variant="h6"> Could not find vendor!</Typography>
        </Grid>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="md" className={classes.root}>
        <Paper className={classes.file}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12}>
              <Tabs
                indicatorColor="primary"
                value={value}
                onChange={handleChange}
                className={classes.tabContainer}
              >
                {vendorTabs.map((t, value) => (
                  <Tab className={classes.tab} key={value} label={t} />
                ))}
              </Tabs>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              {/* Details Page */}
              <Grid item xs={12}>
                <Box
                  display={currentTabFocus === 0 ? "block" : "none"}
                  className={classes.filePage}
                >
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                  >
                    <Grid item xs={3} style={{padding: theme.spacing(2)}}>
                      <img src={data.vendor.image} alt="no image" />
                    </Grid>
                    <Grid item xs={9} style={{padding: theme.spacing(4)}}>
                      <Typography variant="h6">
                        <b>
                          <u>Vendor ID: </u>
                        </b>{" "}
                        {data.vendor.id}
                        <br />
                        <b>
                          {" "}
                          <u>Name: </u>
                        </b>
                        {data.vendor.name}
                      </Typography>
                      <br />
                      <Typography variant="body1">
                        Address: {data.vendor.address}
                        <br />
                        Vendor TIN: {data.vendor.tin}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              {/* Products Page */}
              <Box
                display={currentTabFocus === 1 ? "block" : "none"}
                className={classes.filePage}
              >
                <ProductTable vendorId={data.vendor.id} />
              </Box>

              {/* Reviews Page */}
              <Box
                display={currentTabFocus === 2 ? "block" : "none"}
                className={classes.filePage}
              >
                <Grid item xs={12}>

                </Grid>
              </Box>

              {/* Maps Page */}
              <Box
                display={currentTabFocus === 3 ? "block" : "none"}
                className={classes.filePage}
              ></Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Vendor);
