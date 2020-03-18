import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";

import { useStyles } from "./styles";
import GridViewItem from "./GridViewItem";
import ServiceStatusDetails from "./ServiceStatusDetails";
import NoServicesFound from "./NoServicesFound";
import LoadingAiServices from "./LoadingAiServices";
import { ServiceCreationRoutes } from "../../../AiServiceCreation/ServiceCreationRouter/Routes";

const CardGroup = () => {
  const classes = useStyles();
  const { isLoading, serviceList, orgImg } = useSelector(state => ({
    isLoading: state.loader.aiServiceList.isLoading,
    serviceList: state.aiServiceList.data,
    orgImg: state.organization.assets.heroImage.url,
  }));
  const { orgUuid } = useParams();
  const [isAvailable] = useState(true);

  if (isLoading) {
    return <LoadingAiServices />;
  }

  if (isEmpty(serviceList)) {
    return <NoServicesFound />;
  }

  return serviceList.map(service => {
    const editServiceLink = ServiceCreationRoutes.PROFILE.path
      .replace(":orgUuid", orgUuid)
      .replace(":serviceUuid", service.uuid);

    return (
      <Grid container className={classes.gridViewCardCollection} key={service.uuid}>
        <Grid item xs={12} sm={12} md={3} lg={3} className={classes.serviceDetailCard}>
          <Link to={editServiceLink} className={classes.routerLink}>
            <GridViewItem
              cardTitle={service.displayName}
              cardSubheader="sub header"
              ratingGiven={service.rating.rating}
              totalRating={service.rating.totalUsersRated}
              cardDescription={service.shortDescription}
              isAvailable={isAvailable}
              orgImg={orgImg}
              serviceImg={service.heroImage.url}
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9} className={classes.serviceStatusDetails}>
          <ServiceStatusDetails
            status={service.state.state}
            groups={service.groups}
            editServiceLink={editServiceLink}
          />
        </Grid>
      </Grid>
    );
  });
};

export default CardGroup;
