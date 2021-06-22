import { CssBaseline } from "@material-ui/core";
import React from "react";
import Footer from "./ui/footer";
import Header from "./ui/Header";

export const Layout: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  );
};
