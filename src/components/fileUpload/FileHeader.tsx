import { Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";

export interface fileHeaderProps {
  file: File;
  onDelete: (file: File) => void;
}

export function FileHeader({ file, onDelete }: fileHeaderProps) {
  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item>{file.name}</Grid>
      <Grid item>     
        <IconButton aria-label="delete" onClick={() => onDelete(file)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
