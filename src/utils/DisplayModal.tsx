import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import {
  ErrorOutline,
  CheckCircleOutline
  
} from "@material-ui/icons";
import { green } from "@material-ui/core/colors";

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
  })
);

export interface modalProps {
  title: string;
  message: string;
  show: boolean;
  type: "error" | "success";
}

export const DisplayModal: React.FC<modalProps> = ({
  title,
  message,
  show,
  type,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(show);
  const [modalStyle] = React.useState(getModalStyle);

  console.log("HERER: ", open);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="modal-title">{title}</h2>
          <p id="modal-description">{message}</p>
          {type === "success" ? (
            <CheckCircleOutline style={{ color: green[500] }} />
          ) : (
            <ErrorOutline color="error" />
          )}
          <Button variant="outlined" onClick={handleClose}>
            Ok
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default DisplayModal;
