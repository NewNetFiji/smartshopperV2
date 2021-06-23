import { Badge, Button, Grid, Link} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NextLink from "next/link";
import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Product, useVoteMutation } from "../../generated/graphql";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
interface cardProps {
  data: Product;
  handleAddToCart: (clickedItem: Product) => void;
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

export const ProductCard: React.FC<cardProps> = ({ data, handleAddToCart }) => {
  const classes = useStyles();
  

  const [, vote] = useVoteMutation();
  const [voted, setVoted] = useState(data.voteStatus);
  const [likes, setLike] = useState(data.points as number)

  
  async function handleVote() {
    if (data.voteStatus) {
      //has voted before
      const { error } = await vote({ value: false, productId: data.id });
      if (error) {
        if (error.message.includes("Not Authenticated")) {
          //push to sign in?
        }
        console.log("Error in Vote Mutation:", error);
      } else {
        setLike(likes-1)
        setVoted(false);
      }
    } else {
      const { error } = await vote({ value: true, productId: data.id });
      if (error) {
        console.log("Error in Vote Mutation:", error);
      } else {
        setLike(likes+1)
        setVoted(true);
      }
    }
  }
  
  const handleVendorIconClick = () => {

  }

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
            <Typography component="div" variant="h5" color="textSecondary">
              {capitalizeFirstLetter(data.title)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              component="div"
              align="right"
              variant="h6"
              color="textSecondary"              
            >
              $ { data.basePrice.toFixed(2)}
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
        <IconButton onClick={handleVote} aria-label="like">
          <Badge badgeContent={likes} className={classes.badge}>
            <FavoriteIcon color={voted ? "primary" : "disabled"} />
          </Badge>
        </IconButton>
        <NextLink href="/vendor/[id]" as={`/vendor/${data.vendor.id}`} passHref>
        <IconButton aria-label="vendor" >
          <Avatar
            aria-label="Product"
            className={classes.avatar}
            src={data.vendor.image}
          />
        </IconButton>
        </NextLink>
        <Button
          onClick={()=>handleAddToCart}
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
