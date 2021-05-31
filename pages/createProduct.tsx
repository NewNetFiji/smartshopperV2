import {  
  Button,
  LinearProgress,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { withUrqlClient } from "next-urql";
import React from "react";
import {} from "react-dropzone";
import { ImageUploadField } from "../src/components/fileUpload/ImageUploadField";
import { useCreateProductMutation, useMeQuery } from "../src/generated/graphql";
import { createUrqlClient } from "../src/utils/createUrqlClient";
import { isServer } from "../src/utils/isServer";
import { toErrorMap } from "../src/utils/toErrorMap";

interface Values {
  title: string;
  description: string;
  productAvailabileTo: string;
  productAvailabileFrom: string;
  basePrice: number;
  barcode: string;
  packSize: string;
  discount: number;
  image: string;
  category: string;
  manufacturer: string;
  tags: string;
  vendorId: string;
  files: File[];
}

interface registerProps {}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    flexDirection: "row",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  datePicker: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },    
}));

export const CreateProduct: React.FC<registerProps> = ({}) => {
  const classes = useStyles();
  const [, createProduct] = useCreateProductMutation();
  const [{ data }] = useMeQuery();

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Manually Add a Product
        </Typography>

        <Formik
          initialValues={{
            title: "",
            description: "",
            productAvailabileTo: "",
            productAvailabileFrom: "",
            basePrice: 0,
            barcode: "",
            packSize: "",
            discount: 0,
            image: "",
            category: "",
            manufacturer: "",
            tags: "",
            vendorId: 1,
            files: [],
          }}
          validate={(values) => {
            const errors: Partial<Values> = {};

            if (
              Date.parse(values.productAvailabileFrom) >
              Date.parse(values.productAvailabileTo)
            ) {
              errors.productAvailabileTo =
                "Date needs to be later than Date Avaliable from";
            }

            return errors;
          }}
          onSubmit={async (values, { setErrors, resetForm }) => {
            //get the public vendorId
            values.vendorId = data?.me?.vendorId as number;

            const response = await createProduct({ options: values });
            if (response.data?.createProduct.errors) {
              setErrors(toErrorMap(response.data.createProduct.errors));
            } else if (response.data?.createProduct.product) {
              if (!isServer()) {
                alert(
                  "Product Created: " +
                    response.data?.createProduct.product.title
                );
                resetForm({});
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    id="title"
                    label="Product Name"
                    name="title"
                    autoComplete="title"
                  />
                </Grid>
                <Grid item sm={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    fullWidth
                    id="packSize"
                    label="Pack Size"
                    name="packSize"
                    autoComplete="packSize"
                  />
                </Grid>
                <Grid item sm={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    autoComplete="description"
                    rows={4}
                  />
                </Grid>

                <Grid item sm={12}>
                  <ImageUploadField name="files" />
                </Grid>
                <Grid item sm={12}>
                  {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
                </Grid>
                {/* Pricing */}
                <Grid item xs={12}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
                        Pricing
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid item xs={12}>
                        <FormControl
                          fullWidth                          
                          variant="outlined"
                        >
                          <InputLabel htmlFor="basePrice">Price</InputLabel>
                          <OutlinedInput
                            id="basePrice"
                            type="number"
                            startAdornment={
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            }
                            labelWidth={60}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <Field
                          component={TextField}
                          variant="outlined"
                          fullWidth
                          id="discount"
                          label="Discount"
                          name="discount"
                          type="number"
                        />
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                {/* Availabilty  */}
                <Grid item xs={12}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
                        Availabilty
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid item xs={12} sm={6}>
                        <Field
                          component={TextField}
                          variant="outlined"
                          fullWidth
                          id="productAvailabileFrom"
                          label="Start Date"
                          name="productAvailabileFrom"
                          autoComplete="productAvailabileFrom"
                          type="date"
                          className={classes.datePicker}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Field
                          component={TextField}
                          variant="outlined"
                          fullWidth
                          id="productAvailabileTo"
                          label="End Date"
                          name="productAvailabileTo"
                          autoComplete="productAvailabileTo"
                          type="date"
                          className={classes.datePicker}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                {isSubmitting && <LinearProgress />}
              </Grid>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                //disabled={isSubmitting}
                //onClick={resetForm()}
                className={classes.submit}
              >
                Create Product
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default withUrqlClient(createUrqlClient)(CreateProduct);
