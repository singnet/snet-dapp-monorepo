import React from "react";
import StarRatingComponent from "react-star-rating-component";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
// import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import truncate from "lodash/truncate";
import { withStyles } from "@material-ui/styles";

import RatingsCount from "shared/dist/components/RatingsCount";
import CardImg from "shared/dist/assets/images/SnetDefaultServiceImage.png";
import SingularityLogo from "shared/dist/assets/images/avatar.png";
// import SNETButton from "shared/dist/components/SNETButton";
import { useStyles } from "./styles";

const GridViewItem = ({
  classes,
  orgImg,
  cardTitle,
  serviceImg,
  cardDescription,
  title,
  cardSubheader,
  ratingGiven,
  totalRating,
}) => {
  const GridViewHeaderLength = 35;
  const StartCount = 5;
  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        avatar={<Avatar aria-label="recipe" className={classes.avatar} src={orgImg || SingularityLogo} />}
        classes={{
          title: classes.cardTitle,
          subheader: classes.cardSubheader,
        }}
        title={truncate(cardTitle, { length: GridViewHeaderLength })}
        subheader={cardSubheader}
      />
      <CardMedia className={classes.CardMedia} image={serviceImg || CardImg} title={title} />
      <CardContent className={classes.cardContent}>
        <div className={classes.ratingSection}>
          <StarRatingComponent
            name="rate1"
            starCount={StartCount}
            value={ratingGiven}
            className={classes.ratingStars}
          />
          <RatingsCount ratingGiven={ratingGiven} totalRating={totalRating} />
        </div>
        <Typography className={classes.cardTypograpy} component="p">
          {cardDescription}
        </Typography>
      </CardContent>
      {/* <CardActions className={classes.cardActions}>
        <SNETButton children="preview" variant="text" color="primary" />
      </CardActions> */}
    </Card>
  );
};

export default withStyles(useStyles)(GridViewItem);
