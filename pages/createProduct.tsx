import {
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  InputAdornment,
  LinearProgress,
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
import { array, object, string } from "yup";
import {
  ImageUploadField,
  uploadableFile,
} from "../src/components/fileUpload/ImageUploadField";
import Header from "../src/components/ui/Header";
import { useCreateProductMutation, useMeQuery } from "../src/generated/graphql";
import { clean } from "../src/utils/clean";
import { createUrqlClient } from "../src/utils/createUrqlClient";
import DisplayModal, { modalProps } from "../src/utils/DisplayModal";
import { isServer } from "../src/utils/isServer";
import { toErrorMap } from "../src/utils/toErrorMap";

interface Values {
  //basic descriptors
  title: string;
  description: string;
  packSize: string;
  //images
  imageUrl: string[];

  //pricing
  basePrice: number;
  discount: number;

  //availability
  productAvailableTo: string;
  productAvailableFrom: string;

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
    fontWeight: theme.typography.fontWeightBold,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  mr4: {
    marginRight: 4,
  },
}));



export const CreateProduct: React.FC<registerProps> = ({}) => {
  const classes = useStyles();
  const [, createProduct] = useCreateProductMutation();
  const [{ data: meData }] = useMeQuery();
  const [key, setKey] = useState(Math.random());
  const [expanded, setExpanded] = useState({
    price: false,
    availability: false,
    metaData: false,
  });
  const [loading, setLoading] = useState(false);
  const [modalSettings, setModal] = useState<modalProps>({
    title: "",
    message: "",
    show: false,
    type: "success"
  });

  const initialValues: Values = {
    title: "",
    description: "",
    productAvailableTo: "",
    productAvailableFrom: "",
    basePrice: 0,
    barcode: "",
    packSize: "",
    discount: 0,
    category: "",
    manufacturer: "",
    tags: "",
    vendorId: 1,
    imageUrl: [],
    files: [],
  };

  function handlePriceAccordianClick() {
    if (expanded.price) {
      setExpanded({ ...expanded, price: false });
    } else {
      setExpanded({ ...expanded, price: true });
    }
  }
  function handleAvailAccordianClick() {
    if (expanded.availability) {
      setExpanded({ ...expanded, availability: false });
    } else {
      setExpanded({ ...expanded, availability: true });
    }
  }
  function handleMetaAccordianClick() {
    if (expanded.metaData) {
      setExpanded({ ...expanded, metaData: false });
    } else {
      setExpanded({ ...expanded, metaData: true });
    }
  }

  function roundToTwo(num: number) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }

  function handleModal(prop: boolean) {
    setModal({ ...modalSettings, show: prop });
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
            setLoading(true);

            values.vendorId = meData?.me?.vendorId as number;
            values.imageUrl = values.files.map((a) => a.url) as string[];
            values.basePrice = roundToTwo(values.basePrice);

            const { files, ...rest } = values;
            const cleanedProductObj = clean(rest);

            const { data, error } = await createProduct({
              options: cleanedProductObj,
            });
            if (data?.createProduct.errors) {
              setErrors(toErrorMap(data.createProduct.errors));
            } else if (data?.createProduct.product) {
              if (!isServer()) {
                setModal({
                  title: "Create Product",
                  message: "Successfully created Product!",
                  show: true,
                  type: "success"
                });
                console.log("Success!");

                //reset form
                setKey(Math.random());
                setExpanded({
                  price: false,
                  metaData: false,
                  availability: false,
                });
                resetForm({});
              }
            } else if (error) {
              setModal({
                title: "Create Product",
                message:
                  "There were some Errors in creating your Product. Please Contact Support.",
                show: true,
                type: "error"
              });
              console.log("error: ", error.message);
              resetForm({});
            }
            setLoading(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                {/* {flag && <AlertNotice showAlert={showAlert} />} */}
                <DisplayModal
                  title={modalSettings.title}
                  message={modalSettings.message}
                  show={modalSettings.show}
                  type={modalSettings.type}
                />
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
                  <ImageUploadField key={key} name="files" />
                </Grid>
                <Grid item sm={12}></Grid>
                {/* Pricing */}
                <Grid item xs={12}>
                  <Accordion
                    onClick={handlePriceAccordianClick}
                    expanded={expanded.price}
                  >
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
                      <Grid className="mr4" item xs={12}>
                        <FormControl
                          fullWidth
                          variant="outlined"
                          onClick={(event) => event.stopPropagation()}
                          onFocus={(event) => event.stopPropagation()}
                        >
                          <Field
                            type="number"
                            name="basePrice"
                            label="basePrice"
                            variant="outlined"
                            component={TextField}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              ),
                            }}
                          ></Field>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl
                          fullWidth
                          variant="outlined"
                          onClick={(event) => event.stopPropagation()}
                          onFocus={(event) => event.stopPropagation()}
                        >
                          <Field
                            component={TextField}
                            variant="outlined"
                            fullWidth
                            id="discount"
                            label="Discount"
                            name="discount"
                            type="number"
                          />
                        </FormControl>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                {/* Availabilty  */}
                <Grid item xs={12}>
                  <Accordion
                    onClick={handleAvailAccordianClick}
                    expanded={expanded.availability}
                  >
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
                        <FormControl
                          fullWidth
                          variant="outlined"
                          onClick={(event) => event.stopPropagation()}
                          onFocus={(event) => event.stopPropagation()}
                        >
                          <Field
                            component={TextField}
                            variant="outlined"
                            fullWidth
                            id="productAvailableFrom"
                            label="Start Date"
                            name="productAvailableFrom"
                            autoComplete="productAvailableFrom"
                            type="date"
                            className={classes.datePicker}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl
                          fullWidth
                          variant="outlined"
                          onClick={(event) => event.stopPropagation()}
                          onFocus={(event) => event.stopPropagation()}
                        >
                          <Field
                            component={TextField}
                            variant="outlined"
                            fullWidth
                            id="productAvailableTo"
                            label="End Date"
                            name="productAvailableTo"
                            autoComplete="productAvailableTo"
                            type="date"
                            className={classes.datePicker}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </FormControl>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                {/* Meta-data */}
                <Grid item xs={12}>
                  <Accordion
                    onClick={handleMetaAccordianClick}
                    expanded={expanded.metaData}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="metaDataPanel-content"
                      id="metaDataPanel-header"
                    >
                      <Typography className={classes.heading}>
                        Meta-Data
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        onClick={(event) => event.stopPropagation()}
                        onFocus={(event) => event.stopPropagation()}
                        style={{
                          flexDirection: "row",
                          alignItems: "flex-start",
                          justifyItems: "space-around",
                        }}
                      >
                        <Grid item xs={3} style={{ paddingRight: 4 }}>
                          <Field
                            component={TextField}
                            fullWidth
                            variant="outlined"
                            id="barcode"
                            label="Barcode"
                            name="barcode"
                          />
                        </Grid>
                        <Grid item xs={3} style={{ paddingRight: 4 }}>
                          <Field
                            component={TextField}
                            fullWidth
                            variant="outlined"
                            id="category"
                            label="Category"
                            name="category"
                            autoComplete="category"
                          />
                        </Grid>
                        <Grid item xs={3} style={{ paddingRight: 4 }}>
                          <Field
                            component={TextField}
                            fullWidth
                            variant="outlined"
                            id="manufacturer"
                            label="Manufacturer"
                            name="manufacturer"
                            autoComplete="manufacturer"
                          />
                        </Grid>

                        <Grid item xs={3}>
                          <Field
                            component={TextField}
                            fullWidth
                            variant="outlined"
                            id="tags"
                            label="Tags"
                            name="tags"
                            autoComplete="tags"
                            multiline
                          />
                        </Grid>
                      </FormControl>
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
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default withUrqlClient(createUrqlClient)(CreateProduct);
