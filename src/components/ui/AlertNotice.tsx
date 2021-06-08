import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

export interface AlertNoticeProps{
    showAlert: (show: boolean) => void
}

export function AlertNotice ({ showAlert }: AlertNoticeProps) {
  const classes = useStyles();
  

  return (
    <div className={classes.root}>
      <Collapse in={true}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                showAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Product Sucessfully created!
        </Alert>
      </Collapse>
  
    </div>
  );
}