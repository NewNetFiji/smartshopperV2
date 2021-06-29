import React from 'react'
import { Button as MuiButton, ButtonProps, makeStyles } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5)
    },
    label: {
        textTransform: 'none'
    }
}))

export default function Button(props: ButtonProps) {

    const { children, size, color, variant, onClick, ...other } = props
    const classes = useStyles();
    

    return (
        <MuiButton
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
            classes={{ root: classes.root, label: classes.label }}>
            {children}
        </MuiButton>
    )
}