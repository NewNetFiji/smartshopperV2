import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React from "react";
import { Product } from "../../generated/graphql";

interface cardProps {
  data: Product
}

const useStyles = makeStyles(() => ({
  card: {
    height: '100%',
    width: "200px",
    borderRadius: 25,
    transition: "transform 0.15s ease-in-out",
    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export const ProductCard: React.FC<cardProps> = ({ data }) => {
  const classes = useStyles();

  return (
    <div style={{backgroundColor: "red", borderRadius: 25, margin: 10}} >
    <Card  className={classes.card}>
      <CardMedia        
        className={classes.cardMedia}
        image="https://source.unsplash.com/random"
        title={data.title}
      />
      <CardContent style={{backgroundColor: "red"}} className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {/* Heading */}
          {data.title}
        </Typography>
        <Typography>
          {/* This is a media card. You can use this section to describe the
          content. */}
          {data.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          View
        </Button>
        <Button size="small" color="primary">
          Edit
        </Button>
      </CardActions>
    </Card>
    </div>
  );
}
