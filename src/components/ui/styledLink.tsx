import { Link, makeStyles } from "@material-ui/core";
import React from "react";
import NextLink from "next/link";

interface Props{
    route: string;
    msg: string;
    color?: "primary" | "secondary"
}

const useStyles = makeStyles((theme) => ({
    link: {
      cursor: "pointer",
      
    },
  }));

export const  StyledLink: React.FC<Props> = ({route, msg, color} )=> {
    const classes = useStyles();
    
    (color? color : color="secondary")
    
  return (
    <React.Fragment>
      <NextLink href={route}>
        <Link style={{color: color}} className={classes.link} variant="body2">{msg}</Link>
      </NextLink>
    </React.Fragment>
  );
}

export default StyledLink
