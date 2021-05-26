import { Button, LinearProgress } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Copyright } from "../src/components/ui/copyright";
import StyledLink from "../src/components/ui/styledLink";
import { useLoginMutation } from "../src/generated/graphql";
import { createUrqlClient } from "../src/utils/createUrqlClient";
import { isServer } from "../src/utils/isServer";
import { toErrorMap } from "../src/utils/toErrorMap";

interface Values {
  email: string;
  password: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/ncKxCn5SI3A)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

export const SignIn = ({}) => {
  const router = useRouter();
  const classes = useStyles();
  const [, login] = useLoginMutation();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={async (values: Values, { setErrors }) => {
              const response = await login({ options: values });
              if (response.data?.login.errors) {
                setErrors(toErrorMap(response.data.login.errors));
              } else if (response.data?.login.user) {
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
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <Field
                  component={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {isSubmitting && <LinearProgress />}
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <StyledLink
                      route="/forgotPassword"
                      msg="Forgot Password?"
                    />                    
                  </Grid>
                  <Grid item>
                    <StyledLink
                      route="/register"
                      msg="Don't have an account? Signup"
                    />
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </Form>
            )}
          </Formik>
        </div>
      </Grid>
    </Grid>
  );
};

export default withUrqlClient(createUrqlClient)(SignIn);
