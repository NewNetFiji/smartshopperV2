import { Badge, Button, Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { Product } from "../../generated/graphql";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

interface cardProps {
  data: Product;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      height: "100%",
      borderRadius: 15,
      transition: "transform 0.15s ease-in-out",
      "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
    },
    media: {
      height: "163px",
      width: "300px",
      //paddingTop: '56.25%', // 16:9
    },
    noMedia: {
      height: "188px",
      width: "300px",
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
      // backgroundColor: red[500],
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    namePriceArea: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    button: {
      margin: theme.spacing(1),
      marginLeft: "auto",
    },
    badge: {
      color: "#ec407a",
    },
  })
);

// const getImages = (prodId: number) => {
//   const [{ data }] = useImagesQuery({
//     variables: { productId: prodId },
//   });

//   if (data?.images) {
//     return data.images;
//   } else {
//     return [];
//   }
// };

export const ProductCard: React.FC<cardProps> = ({ data }) => {
  const classes = useStyles();
  // const images = getImages(data.id);

  return (
    <Card className={classes.root}>
      {/* <CardHeader
        avatar={
          <Avatar aria-label="Product" className={classes.avatar} src={data.vendor.image} />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data.title}
        subheader={data.packSize}
      /> */}
      
      {data.images && data.images[0].id !== null ? (
        <Carousel autoPlay={false}>
          {data.images.map((image, i) => (
            <img
              className={classes.media}
              key={i}
              alt={image.id!.toString()}
              src={image.url!}
            />
          ))}
        </Carousel>
      ) : (
        <img
          className={classes.noMedia}
          alt="No Image"
          src="https://res.cloudinary.com/patrickqueet/image/upload/v1623181676/smartShopper/noImage_ftosgr.jpg"
        />
      )}

      <CardContent className={classes.namePriceArea}>
        <Grid container>
          <Grid item xs={6}>
            <Typography component="div" variant="h5" color="textSecondary" >
              {capitalizeFirstLetter(data.title)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="div" align="right" variant="h6" color="textSecondary">
              $ {data.basePrice}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component="div" variant="body2" color="textSecondary">
              Pack Size: {data.packSize}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like">
          <Badge badgeContent={data.points} className={classes.badge}>
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <IconButton aria-label="vendor">
          <Avatar
            aria-label="Product"
            className={classes.avatar}
            src={data.vendor.image}
          />
        </IconButton>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<AddShoppingCartIcon />}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};
