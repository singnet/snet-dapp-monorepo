import React from "react";
import truncate from "lodash/truncate";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import CardImg from "shared/dist/assets/images/SnetDefaultServiceImage.png";
import AnchorLink from "shared/dist/components/AnchorLink";

import { useStyles } from "./styles";

const RelatedContent = ({ classes, cardTitle, cardMedia, cardDescription, cardAction, cardLinkTo }) => {
  const cardHeaderLength = 35;
  return (
    <Card className={classes.card}>
      <CardHeader className={classes.cardHeader} />
      <CardMedia className={classes.CardMedia} image={cardMedia || CardImg} />
      <CardContent className={classes.cardContent}>
        <Typography className={classes.cardTitle}>{truncate(cardTitle, { length: cardHeaderLength })}</Typography>
        <Typography className={classes.cardDescription}>{cardDescription}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <AnchorLink label={cardAction} href={cardLinkTo} newTab={true} />
      </CardActions>
    </Card>
  );
};

export default withStyles(useStyles)(RelatedContent);
