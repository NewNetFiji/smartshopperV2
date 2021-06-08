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
import React, { useState } from "react";
import { ImageUploadField, uploadableFile } from "../src/components/fileUpload/ImageUploadField";
import { useCreateProductMutation, useMeQuery } from "../src/generated/graphql";
import { createUrqlClient } from "../src/utils/createUrqlClient";
import { isServer } from "../src/utils/isServer";
import { toErrorMap } from "../src/utils/toErrorMap";
import { array, object, string } from 'yup';
import { AlertNotice } from "../src/components/ui/AlertNotice";
import Header from "../src/components/ui/Header";

interface Values {
  //basic descriptors
  title: string;
  description: string;
  packSize: string;
   //images
   images: string[];
  

  //pricing
  basePrice: number;
  discount: number;

  //availability
  productAvailabileTo: string;
  productAvailabileFrom: string;

  //meta data
  barcode: string;
  category: string;
  manufacturer: string;
  tags: string;

  //hidden fields
  vendorId: number;
  files: uploadableFile[];

 
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
  const [flag, showAlert] = useState(false)
  const initialValues: Values = {
    title: "",
    description: "",
    productAvailabileTo: "",
    productAvailabileFrom: "",
    basePrice: 0,
    barcode: "",
    packSize: "",
    discount: 0,           
    category: "",
    manufacturer: "",
    tags: "",
    vendorId: 1,
    images: [],
    files: []
  }

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Header />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Manually Add a Product
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={object({
            images: array(
              object({
                url: string().required(),
              })
            ),
          })}
          onSubmit={async (values, { setErrors, resetForm }) => {            
            //get the public vendorId
            values.vendorId = data?.me?.vendorId as number;
                        
            values.images = values.files.map(a => a.url) as string[];
            const {files, ...rest} = values
            
            const response = await createProduct({ options: rest });
            if (response.data?.createProduct.errors) {
              setErrors(toErrorMap(response.data.createProduct.errors));
            } else if (response.data?.createProduct.product) {
              if (!isServer()) {
                showAlert(true)
                resetForm({});
                
              }
            }
          }}
        >
          {({  isSubmitting  }) => (
            
            <Form className={classes.form}>
              <Grid container spacing={2}>
              {flag && <AlertNotice showAlert={showAlert}/>}
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
                    multiline
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
                        <FormControl fullWidth variant="outlined">
                          <InputLabel htmlFor="basePrice">Price</InputLabel>
                          <OutlinedInput
                            id="basePrice"                            
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
                {/* Meta-data */}
                <Grid item xs={12}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
                        Meta-Data
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid item xs={12}>
                        <Field
                          component={TextField}
                          variant="outlined"
                          fullWidth
                          id="barcode"
                          label="Barcode"
                          name="barcode"
                          
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          component={TextField}
                          variant="outlined"
                          fullWidth
                          id="category"
                          label="Category"
                          name="category"
                          autoComplete="category"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          component={TextField}
                          variant="outlined"
                          fullWidth
                          id="manufacturer"
                          label="Manufacturer"
                          name="manufacturer"
                          autoComplete="manufacturer"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Field
                          component={TextField}
                          variant="outlined"
                          fullWidth
                          id="tags"
                          label="Tags"
                          name="tags"
                          autoComplete="tags"
                          multiline
                          rows={4}
                        />
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                {isSubmitting && <LinearProgress />}
                {/* {flag && JSON.stringify({ values, errors }, null, 4)} */}
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
