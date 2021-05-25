import { Typography, Link } from "@material-ui/core";
import React from "react";

export function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="#">
          NewNet Pte Ltd
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }