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
    width: "75%",
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
  { id: "title", label: "Product Title" },
  { id: "description", label: "Product Description", disableSorting: true },
  { id: "packSize", label: "Pack Size", disableSorting: true },
  { id: "basePrice", label: "Price" },
  { id: "points", label: "Likes" },
];

interface props {
  vendorId: number;
}

export default function ProductTable({ vendorId }: props) {
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

  const handleCellClick = (id: number|string) => (e: React.MouseEvent<HTMLTableRowElement>) => {
      
    console.log("event: ", id)
}

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
                <TableRow key={item.id} onClick={handleCellClick(item.id)}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.descSnippet}</TableCell>
                  <TableCell>{item.packSize}</TableCell>
                  <TableCell>{item.basePrice}</TableCell>
                  <TableCell>{item.points}</TableCell>
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
