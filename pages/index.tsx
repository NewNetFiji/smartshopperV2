import {
  makeStyles
} from "@material-ui/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../src/utils/createUrqlClient";
import { Products } from "./products";

const useStyles = makeStyles((theme) => ({
  
}));

const Index = () => {
  const classes = useStyles();
  

  return (
    <Products />
  );
};

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
