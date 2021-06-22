import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../src/utils/createUrqlClient";
import { Products } from "../src/components/product/Products";
import { Layout } from "../src/components/Layout";


const Index = () => {

  return (
    <Layout>
      <Products />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
