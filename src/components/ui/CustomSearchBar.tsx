import React, { KeyboardEventHandler, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { isServer } from "../../utils/isServer";

interface props {
  variables: {
    limit: number;
    cursor: string | null | undefined;
    filterString: string | null | undefined;
  };
  setVariables: React.Dispatch<
    React.SetStateAction<{
      limit: number;
      cursor: string | null | undefined;
      filterString: string | null | undefined;
    }>
  >;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: "100%",
      marginBottom: 10,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

export const CustomSearchBar: React.FC<props> = ({
  variables,
  setVariables,
}) => {
  const classes = useStyles();
  const [searchString, setStr ] = useState<string | null>()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e.target.value)
      setStr(e.target.value)   
  };
  
  const handleSubmit = () => {
    
    console.log("searchString: ", searchString)  
    setVariables({
      limit: variables.limit,
      cursor: variables.cursor,
      filterString: searchString,
    });
  }

  
  console.log("search: ", searchString)
  console.log("variables now: ", variables)

  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search Products"
        inputProps={{ "aria-label": "search products" }}
        onChange={handleChange}
          
      />
      <IconButton        
        className={classes.iconButton}
        aria-label="search"
        onClick={handleSubmit}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
