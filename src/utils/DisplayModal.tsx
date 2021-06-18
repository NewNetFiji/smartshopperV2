import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Grid, Typography } from "@material-ui/core";
import { ErrorOutline, CheckCircleOutline } from "@material-ui/icons";
import { green } from "@material-ui/core/colors";
import theme from "../theme";

export interface modalProps {
  title: string;
  message: string;
  show: boolean;
  type: "error" | "success";
  resetModal: () => void;
}

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    container: {
      display: "flex",
      flexDirection: "column",
      justifyItems: "center",
      alignItems: "center",
    },
  })
);

export const DisplayModal: React.FC<modalProps> = ({
  title,
  message,
  show,
  type,
  resetModal,
}) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const handleClose = () => {
    resetModal();
  };

  return (
    <div>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <Grid container className={classes.container}>
            <Grid item>
              {type === "success" ? (
                <CheckCircleOutline style={{ color: green[500] }} />
              ) : (
                <ErrorOutline color="error" />
              )}
            </Grid>
            <Grid item style={{ paddingBottom: theme.spacing(3) }}>
              <Typography variant="h5">{title}</Typography>
            </Grid>
            <Grid item style={{ paddingBottom: theme.spacing(3) }}>
              <Typography align="center" component="p" id="modal-description">
                {message}
              </Typography>
            </Grid>

            <Grid item>
              <Button variant="outlined" onClick={handleClose}>
                Ok
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
};

export default DisplayModal;
