import React from "react";
import { withStyles } from "@material-ui/core/styles";

import { useStyles } from "./styles";
import SubmitForReview from "./SubmitForReview";
import LaunchService from "./LaunchService";
import { serviceCreationStatus } from "../constant";
import ReviewInProgress from "./ReviewInProgress";
import ChangeRequested from "./ChangeRequested";
import Rejected from "./Rejected";
import { ServiceCreationRoutes } from "../ServiceCreationRouter/Routes";
import { useSelector } from "react-redux";

const Submit = props => {
  const {
    serviceDetails,
    changeServiceProviderComments,
    changeGroups,
    handleBackToDashboard,
    changeServiceDetailsLeaf,
    match,
    history,
  } = props;

  const { orgUuid, orgStatus, orgId } = useSelector(state => ({
    orgUuid: state.organization.uuid,
    orgStatus: state.organization.state.state,
    orgId: state.organization.id,
  }));

  const handleContinueEdit = () => {
    const { orgUuid, serviceUuid } = match.params;
    history.push(ServiceCreationRoutes.PROFILE.path.replace(":orgUuid", orgUuid).replace(":serviceUuid", serviceUuid));
  };
  const componentForStatus = {
    [serviceCreationStatus.NOT_STARTED]: (
      <SubmitForReview
        serviceDetails={serviceDetails}
        changeServiceProviderComments={changeServiceProviderComments}
        changeGroups={changeGroups}
        orgId={orgId}
        serviceId={serviceDetails.id}
      />
    ),
    [serviceCreationStatus.DRAFT]: (
      <SubmitForReview
        serviceDetails={serviceDetails}
        changeServiceProviderComments={changeServiceProviderComments}
        changeGroups={changeGroups}
        orgId={orgId}
        serviceId={serviceDetails.id}
      />
    ),
    [serviceCreationStatus.PUBLISH_IN_PROGRESS]: (
      <SubmitForReview
        serviceDetails={serviceDetails}
        changeServiceProviderComments={changeServiceProviderComments}
        changeGroups={changeGroups}
        orgId={orgId}
        serviceId={serviceDetails.id}
      />
    ),
    [serviceCreationStatus.PUBLISHED]: (
      <SubmitForReview
        serviceDetails={serviceDetails}
        changeServiceProviderComments={changeServiceProviderComments}
        changeGroups={changeGroups}
        orgId={orgId}
        serviceId={serviceDetails.id}
      />
    ),
    [serviceCreationStatus.APPROVAL_PENDING]: <ReviewInProgress handleBackToDashboard={handleBackToDashboard} />,
    [serviceCreationStatus.APPROVED]: (
      <LaunchService serviceDetails={serviceDetails} handleBackToDashboard={handleBackToDashboard} />
    ),
    [serviceCreationStatus.CHANGE_REQUESTED]: (
      <ChangeRequested
        comments={serviceDetails.comments}
        changeServiceDetailsLeaf={changeServiceDetailsLeaf}
        onContinueToEdit={handleContinueEdit}
        serviceDetails={serviceDetails}
        orgUuid={orgUuid}
        orgStatus={orgStatus}
      />
    ),
    [serviceCreationStatus.REJECTED]: <Rejected approverComments={serviceDetails.comments.SERVICE_APPROVER} />,
  };

  const Component = componentForStatus[serviceDetails.serviceState.state];

  if (Component) {
    return Component;
  }
  return null;
};
export default withStyles(useStyles)(Submit);
