import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import AnchorLink from "shared/dist/components/AnchorLink";
import { serviceCreationArticlesLink } from "./content";
import { useStyles } from "./styles";

const NoServicesFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.noServicesFoundContainer}>
      <Typography variant="subtitle1">No AI Serivce available. Please create a new AI service to begin</Typography>
      <Card className={classes.noServicesFoundCard}>
        <CardHeader
          title={<Typography variant="subtitle1"> Some articles to help you with service creation</Typography>}
        />
        <List>
          {serviceCreationArticlesLink.map(article => (
            <ListItem key={article.label}>
              <AnchorLink label={article.label} href={article.href} newTab={article.newTab} />
            </ListItem>
          ))}
        </List>
      </Card>
    </div>
  );
};

export default NoServicesFound;
