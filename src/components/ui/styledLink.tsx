import { Link, makeStyles } from "@material-ui/core";
import React from "react";
import NextLink from "next/link";

interface Props{
    route: string;
    msg: string;
}

const useStyles = makeStyles((theme) => ({
    link: {
      cursor: "pointer"
    },
  }));

export const  StyledLink: React.FC<Props> = ({route, msg} )=> {
    const classes = useStyles();    
  return (
    <React.Fragment>
      <NextLink href={route}>
        <Link className={classes.link} variant="body2">{msg}</Link>
      </NextLink>
    </React.Fragment>
  );
}

export default StyledLink
