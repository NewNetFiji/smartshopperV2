import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../src/utils/createUrqlClient";

const Index = () => {
  return (
  <div>Hello Next.js</div>
  )
};

export default withUrqlClient(createUrqlClient)(Index);
