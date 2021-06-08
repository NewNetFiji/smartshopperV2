import { Button } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareIcon from "@material-ui/icons/Share";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { Product, useImagesQuery } from "../../generated/graphql";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

interface cardProps {
  data: Product;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      height: "100%",
      transition: "transform 0.15s ease-in-out",
      "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
    },
    media: {
      height: "163px",
      width: "300px",
      //paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
    namePriceArea: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);

const getImages = (prodId: number) => {
  const [{ data }] = useImagesQuery({
    variables: { productId: prodId },
  });

  if (data?.images) {
    return data.images;
  } else {
    return [];
  }
};

export const ProductCard: React.FC<cardProps> = ({ data }) => {
  const classes = useStyles();
  const images = getImages(data.id);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {data.vendorId}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data.title}
        subheader={data.packSize}
      />
      {images.length > 0 ? (
        <Carousel autoPlay={false}>
          {images.map((image, i) => (
            <img
              className={classes.media}
              key={i}
              alt={image.id.toString()}
              src={image.url}
            />
          ))}
        </Carousel>
      ) : (        
        <img
          className={classes.media}
          alt="No Image"
          src="https://res.cloudinary.com/patrickqueet/image/upload/v1623181676/smartShopper/noImage_ftosgr.jpg"
        />        
      )}

      <CardContent className={classes.namePriceArea}>
        <Typography variant="h5" color="textSecondary" component="p">
          {capitalizeFirstLetter(data.title)}
        </Typography>
        <Typography variant="h6" color="textSecondary" component="p">
          $ {data.basePrice}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<AddShoppingCartIcon />}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};
