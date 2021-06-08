import IconButton from "@material-ui/core/Button";
import MobileStepper from "@material-ui/core/MobileStepper";
import {
    createStyles,
    makeStyles,
    Theme,
    useTheme
} from "@material-ui/core/styles";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import React from "react";
import { useImagesQuery } from "../../generated/graphql";

interface carouselProp {
  productId: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 400,
      flexGrow: 1,
    },
    header: {
      display: "flex",
      alignItems: "center",
      height: 50,
      paddingLeft: theme.spacing(4),
      backgroundColor: theme.palette.background.default,
    },
    img: {
      height: 255,
      maxWidth: 400,
      overflow: "hidden",
      display: "block",
      width: "100%",
    },
  })
);

export const Carousel: React.FC<carouselProp> = ({ productId }) => {
  const classes = useStyles();
  const theme = useTheme();

  if (productId) {
    const [activeStep, setActiveStep] = React.useState(0);

    const [{ data, fetching }] = useImagesQuery({
      variables: { productId: productId },
    });

    if (fetching) {
      return <span>Loading...</span>;
    } else if (data?.images?.length) {
      const maxSteps = data.images?.length as number;

      const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };

      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };

      return (
        <div className={classes.root}>
          <img
            className={classes.img}
            src={data.images?.[activeStep].url}
            alt={data.images?.[activeStep].id.toString()}
          />
          <MobileStepper
            variant="dots"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            className={classes.root}
            nextButton={
              <IconButton
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                <NavigateNextIcon />                
              </IconButton>
            }
            backButton={
              <IconButton
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >                
                <NavigateBeforeIcon />
              </IconButton>
            }
          />
        </div>
      );
    }
  }
  return (
    <div className={classes.root}>
      <img alt="NoImage" src="../../assets/noImage2.jpg" />
    </div>
  );
};

export default Carousel;
