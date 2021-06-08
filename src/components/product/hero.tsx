import { Container, IconButton, makeStyles, Paper } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import React from "react";
import Slider from "react-slick";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },

  paper: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: "225px",
    height: "225px",
    transition: "transform 0.15s ease-in-out",
    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
    justifyContent: "center",
  },
}));

interface Vendors {
  id: number;
  name: string;
  image: string;
  address: string;
}

function NextArrow() {
return(
  <IconButton><NavigateNextIcon color="primary" /></IconButton>
)
}

function PrevArrow() {
  return(
    <IconButton><NavigateBeforeIcon color="primary" /></IconButton>
  )
  }

export default function Hero() {
  const classes = useStyles();

  const vendors: Vendors[] = [
    {
      id: 1,
      name: "New World",
      address: "123 Good time Av",
      image:
        "https://res.cloudinary.com/patrickqueet/image/upload/v1623123411/smartShopper/nw_c3rzpp.png",
    },
    {
      id: 2,
      name: "MH Super Fresh",
      address: "Tamavua Suva",
      image:
        "https://res.cloudinary.com/patrickqueet/image/upload/v1623123411/smartShopper/mh_aedbfg.jpg",
    },
    {
      id: 3,
      name: "Max Value",
      address: "Suva City",
      image:
        "https://res.cloudinary.com/patrickqueet/image/upload/v1623123411/smartShopper/max_kejrvw.png",
    },
    {
      id: 4,
      name: "Shop&Save",
      address: "Nabua",
      image:
        "https://res.cloudinary.com/patrickqueet/image/upload/v1623123411/smartShopper/sns_nf0oob.png",
    },
    {
      id: 5,
      name: "P Mehgji",
      address: "Garden City Suva",
      image:
        "https://res.cloudinary.com/patrickqueet/image/upload/v1623123411/smartShopper/pm_e1apil.jpg",
    },
    {
      id: 6,
      name: "Cost U Less",
      address: "Laucala Beach Suva",
      image:
        "https://res.cloudinary.com/patrickqueet/image/upload/v1623123411/smartShopper/cul_ff4bif.png",
    },
  ];

  const settings = {
    className: "center",
    arrows: true,
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    nextArrow: <NavigateNextIcon color="primary" />,
    prevArrow: <NavigateBeforeIcon color="primary"/>,

    // autoplay: true,
    // autoplaySpeed: 2000,
    // cssEase: "linear",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <React.Fragment>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container >
          <Slider {...settings}>
            {vendors.map((vendor) => (
              <div key={vendor.id}>
                <Paper className={classes.paper}>
                  <img
                    className={classes.paper}
                    src={vendor.image}
                    alt={vendor.name}
                  />
                </Paper>
              </div>
            ))}
          </Slider>
        </Container>
      </div>

      {/* End hero unit */}
    </React.Fragment>
  );
}
