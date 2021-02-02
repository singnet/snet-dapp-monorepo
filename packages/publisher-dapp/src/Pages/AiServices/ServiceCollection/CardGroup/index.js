import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";

import { useStyles } from "./styles";
import GridViewItem from "./GridViewItem";
import ServiceStatusDetails from "./ServiceStatusDetails";
import NoServicesFound from "./NoServicesFound";
import LoadingAiServices from "./LoadingAiServices";

const selectState = state => ({
  orgName: state.organization.name,
});

const CardGroup = () => {
  const classes = useStyles();
  const { isLoading, serviceList, orgImg, orgId } = useSelector(state => ({
    isLoading: state.loader.aiServiceList.isLoading,
    serviceList: state.aiServiceList.data,
    orgImg: state.organization.assets.heroImage.url,
    orgId: state.organization.id,
  }));
  const { orgUuid } = useParams();
  const [isAvailable] = useState(true);
  const { orgName } = useSelector(selectState);

  if (isLoading) {
    return <LoadingAiServices />;
  }

  if (isEmpty(serviceList)) {
    return <NoServicesFound />;
  }

  return serviceList.map(service => {
    return (
      <Grid container className={classes.gridViewCardCollection} key={service.uuid}>
        <Grid item xs={12} sm={12} md={3} lg={3} className={classes.serviceDetailCard}>
          <GridViewItem
            cardTitle={service.displayName}
            cardSubheader={orgName}
            ratingGiven={service.rating.rating}
            totalRating={service.rating.totalUsersRated}
            cardDescription={service.shortDescription}
            isAvailable={isAvailable}
            orgImg={orgImg}
            serviceImg={service.assets.heroImage.url}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9} className={classes.serviceStatusDetails}>
          <ServiceStatusDetails
            status={service.serviceState.state}
            groups={service.groups}
            serviceUuid={service.uuid}
            orgUuid={orgUuid}
            orgId={orgId}
            serviceId={service.id}
          />
        </Grid>
      </Grid>
    );
  });
};

export default CardGroup;
