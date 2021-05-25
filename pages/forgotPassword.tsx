import { Button, Container, LinearProgress } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Copyright } from "../src/components/ui/copyright";
import { useForgotPasswordMutation } from "../src/generated/graphql";
import { createUrqlClient } from "../src/utils/createUrqlClient";
import StyledLink from "../src/components/ui/styledLink";

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

export const ForgotPassword = ({}) => {
  const router = useRouter();
  const classes = useStyles();
  const [msg, setMsg] = useState(false);
  const [, resetPassword] = useForgotPasswordMutation();
  let done: any = null;

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
            email: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await resetPassword({ email: values.email });

            if (response.data?.forgotPassword) {
              setMsg(true);
            } else {
              console.log(response);
            }
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

              {msg ? (
                <>
                  <Typography variant="body2">
                    An email will be sent to that account if it is registered
                  </Typography>
                  <br />
                </>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Request Reset Token
                </Button>
              )}
              <Grid container>
                <Grid item xs>
                  <StyledLink route="/signIn/signIn" msg="Go to Sign-In Page" />
                </Grid>
                <Grid item>
                  <StyledLink
                    route="/register"
                    msg="Don't have an account? Sign Up"
                  />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
