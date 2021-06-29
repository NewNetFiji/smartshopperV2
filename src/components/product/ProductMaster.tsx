import React, { useState } from "react";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Backdrop,
  CircularProgress,
  TableContainer,
} from "@material-ui/core";
import useTable from "../ui/useTable";
import Controls from "../controls/Controls";
import { Search } from "@material-ui/icons";
import { useProductsQuery } from "../../generated/graphql";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    maxHeight: "150vh",
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "100%",
    color: theme.palette.text.primary,
  },
  tableContainer: {
    maxHeight: "75vh",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const headCells = [
    { id: "id", label: "ID" },
  { id: "title", label: "Name" }
  
];

interface props {
  vendorId: number;
  handleCellClick: (id: number)=>void
}

export default function ProductMaster({ vendorId , handleCellClick}: props) {
  const classes = useStyles();

  const [{ data, fetching }] = useProductsQuery({
    variables: { vendorId: vendorId },
  });

  
  const [records, setRecords] = useState(data?.products || []);
  const [filterFn, setFilterFn] = useState({
    //@ts-ignore
    fn: (items) => {
      return items;
    },
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable({ records, headCells, filterFn });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        
        else
        //@ts-ignore
          return items.filter((x) =>
            x.title.toLowerCase().includes(target.value)
          );
      },
    });
  };

  

  return (
    <>
      <Paper className={classes.pageContent}>
        <Backdrop className={classes.backdrop} open={fetching}>
          <CircularProgress color="primary" />
        </Backdrop>
        <Toolbar>
          <Controls.Input
            label="Search Product Name"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Toolbar>
        <TableContainer className={classes.tableContainer}>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((item) => (
                <TableRow key={item.id} onClick={()=>handleCellClick(item)}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
        </TableContainer>
        <TblPagination />
      </Paper>
    </>
  );
}
