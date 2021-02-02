import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import VerificationFailed from "shared/dist/assets/images/VerificationFailed.png";
import SNETStatusBanner, { statusTitleType } from "shared/dist/components/SNETStatusBanner";
import { organizationActions } from "../../../../../Services/Redux/actionCreators";
import { AuthenticateRoutes } from "../../AuthenitcateRouter/Routes";

const ChangeRequested = ({ rejectReason }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleEditOrgDetails = async () => {
    await dispatch(organizationActions.setOrgAllowChangeRequestEdit(true));
    history.push(AuthenticateRoutes.ORGANIZATION.path);
  };

  return (
    <SNETStatusBanner
      title="Your organization details need changes."
      img={VerificationFailed}
      description={
        <span>
          There have been some comments/changes on your organization . Please check your inbox for mail from
          singularitynet team with detailed explanation for the changes to be made for your organization.
          <br />
          <br />
          <strong>Comments:</strong> {rejectReason}.
          <br />
        </span>
      }
      actions={[
        {
          children: "EDIT DETAILS",
          variant: "contained",
          color: "primary",
          onClick: handleEditOrgDetails,
        },
        {
          children: "contact support",
          variant: "outlined",
          color: "primary",
          href: `mailto:${process.env.REACT_APP_SNET_SUPPORT_MAIL}`,
          target: "_blank",
          rel: "noreferrer noopener",
        },
      ]}
      type={statusTitleType.CHANGE_REQUESTED}
    />
  );
};

export default ChangeRequested;
