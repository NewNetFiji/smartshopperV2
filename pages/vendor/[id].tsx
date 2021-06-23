import {
  Box,
  Container,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Layout } from "../../src/components/Layout";
import { useVendorQuery } from "../../src/generated/graphql";
import theme from "../../src/theme";
import { createUrqlClient } from "../../src/utils/createUrqlClient";

interface props {}

// Shared State
let lastTab: number;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  center: {
    display: "flex",
    height: "100vh",
    alignContent: "center",
    justifyContent: "center",
  },
  header: {
    marginTop: theme.spacing(3),
  },
  detail: {
   
  },
  tabContainer: {
    marginLeft: "auto",
    overflowX: "auto",
    color: theme.palette.getContrastText("#ffffff"),
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    color: theme.palette.getContrastText("#ffffff"),
  },
  tabBox: {
    border: 1,
    borderColor: theme.palette.grey[500],
    borderRadius: 15,
    padding: 5,
    marginTop: theme.spacing(1),
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
    console.log("tab: ", newTab);
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
      <Container maxWidth="md">
        <Grid container className={classes.root}>
          <Grid item className={classes.detail} xs={12}>
            <Tabs
              value={value}
              onChange={handleChange}
              className={classes.tabContainer}
            >
              {vendorTabs.map((t, value) => (
                <Tab className={classes.tab} key={value} label={t} />
              ))}
            </Tabs>
          </Grid>
          <Grid item className={classes.header} xs={12}>
            <Box display={currentTabFocus === 0 ? "block" : "none"}>
              <Typography variant="h6"> 1</Typography>
            </Box>
            <Box
              display={currentTabFocus === 1 ? "block" : "none"}
              style={{
                justifyContent: "center",
                alignContent: "center",
                border: 1,
                height: "100vh",
                width: "100%",
                backgroundColor: "#ff0000",
              }}
            >
              <Typography variant="h6"> 2</Typography>
            </Box>
            <Box
              display={currentTabFocus === 2 ? "block" : "none"}
              style={{
                justifyContent: "center",
                alignContent: "center",
                border: 1,
                height: "100vh",
                width: "100%",
                backgroundColor: "#00ff00",
              }}
            >
              <Typography variant="h6"> 3</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Vendor);
