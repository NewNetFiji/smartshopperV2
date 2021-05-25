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
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Copyright } from "../../src/components/ui/copyright";
import { useChangePasswordMutation } from "../../src/generated/graphql";
import { createUrqlClient } from "../../src/utils/createUrqlClient";
import { toErrorMap } from "../../src/utils/toErrorMap";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { isServer } from "../../src/utils/isServer";
import NextLink from "next/link";
import StyledLink from "../../src/components/ui/styledLink";

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
    paddingRight: "10px",
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
  link: {
    cursor: "pointer",
  },
}));

export const ChangePassword: NextPage<{}> = ({}) => {
  const router = useRouter();
  const classes = useStyles();
  const [, resetPassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <Formik
          initialValues={{
            newPassword: "",
            confirmPassword: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await resetPassword({
              newPassword: values.newPassword,
              confirmPassword: values.confirmPassword,
              token:
                typeof router.query.token === "string"
                  ? router.query.token
                  : "",
            });

            if (response.data?.changePassword.errors) {
              const errorMap = toErrorMap(response.data.changePassword.errors);
              if ("token" in errorMap) {
                setTokenError(errorMap.token);
              }
              setErrors(errorMap);
            } else if (response.data?.changePassword.user) {
              if (!isServer()) {
                router.push("/dashBoard");
              }
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
                id="newPassword"
                label="New Password"
                name="newPassword"
                type="password"
                autoFocus
              />
              <Field
                component={TextField}
                autoComplete="new-password"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
              />

              {isSubmitting && <LinearProgress />}
              {tokenError ? (
                <>
                  <div className={classes.errorMsg}>
                    <ErrorOutlineIcon color="error" />
                    <Typography className={classes.errorTxt}>
                      {tokenError}
                    </Typography>

                    <NextLink href="/forgotPassword">
                      <Link className={classes.link}>
                        <Typography>Get a new Token</Typography>
                      </Link>
                    </NextLink>
                  </div>
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
                  Change Password
                </Button>
              )}
              <Grid container>
                <Grid item xs>
                  <StyledLink route="/signIn" msg="Go to Sign-In Page" />
                </Grid>
                <Grid item>
                  <StyledLink
                    route="/register"
                    msg="Don't have an account? Signup"
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

export default withUrqlClient(createUrqlClient)(ChangePassword);
