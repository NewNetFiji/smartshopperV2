import { Button, Container, LinearProgress } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../../src/utils/createUrqlClient";
import { useGetIdFromUrl } from "../../src/utils/useGetIdFromUrl";



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  errorMsg: {
    display: "flex",
  },
  errorTxt: {
    paddingLeft: "10px",

    color: theme.palette.error.main,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

 const UpdateProduct  = ({  }) => {
  const classes = useStyles();
  //const { {data:ProductQuery}  } = useGetIdFromUrl();
  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <Formik
          initialValues={{
            title: data?.product?.title,
            description: data?.product?.description,
            productAvailabileTo: data?.product?.productAvailabileTo,
            productAvailabileFrom: data?.product?.productAvailabileFrom,
            basePrice: data?.product?.basePrice,
            barcode: data?.product?.barcode,
            packSize: data?.product?.packSize,
            discount: data?.product?.discount,
            image: data?.product?.image,
            category: data?.product?.category,
            status: data?.product?.status,
            manufacturer: data?.product?.manufacturer,
            tags: data?.product?.tags,
          }}
          onSubmit={async (values, { setErrors }) => {
            
          }}
        >
          {({ isSubmitting }) => (
            <Form className={classes.form}>
              <Field
                component={TextField}
                autoComplete="off"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoFocus
              />

              {isSubmitting && <LinearProgress />}

              
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Update
                </Button>
              
              
            </Form>
          )}
        </Formik>
      </div>     
    </Container>
  );
};

export default withUrqlClient(createUrqlClient)(UpdateProduct);
