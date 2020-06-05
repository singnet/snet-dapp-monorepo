import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";

import SNETStatusBanner, { statusTitleType } from "shared/dist/components/SNETStatusBanner";
import AlertBox from "shared/dist/components/AlertBox";
import VerificationApprovedImage from "shared/dist/assets/images/VerificationApproved.png";

const ReadyToLaunch = ({ classes, handlePublish, handleBackToDashboard, alert, openDaemonConfigModal }) => {
  const handleOpenDaemonConfigModal = e => {
    e.preventDefault();
    openDaemonConfigModal();
  };
  return (
    <div className={classes.statusBannerContainer}>
      <SNETStatusBanner
        title="Ready to Launch"
        img={VerificationApprovedImage}
        description={
          <Fragment>
            <Typography> Please proceed to launch to complete the final step.</Typography>
            <ul>
              <li>
                <Typography>
                  The final launch will require you to be logged into your Metamask with some ETH available to activate
                  the service.
                </Typography>
              </li>
              <li>
                <Typography>Only the owner of the organization can launch an update.</Typography>
              </li>
              <li>
                <Typography>
                  Once you launch the update, it will take some for your changes to be reflected on AI Marketplace.
                </Typography>
              </li>
              <li>
                <Typography>
                  Click <span onClick={handleOpenDaemonConfigModal}>here</span> to open daemon config modal
                </Typography>
              </li>
            </ul>
          </Fragment>
        }
        actions={[
          { children: "Launch Service", variant: "contained", color: "primary", onClick: handlePublish },
          { children: "back to dashboard", variant: "outlined", color: "primary", onClick: handleBackToDashboard },
        ]}
        type={statusTitleType.PENDING}
      />
      <AlertBox type={alert.type} message={alert.message} />
    </div>
  );
};

export default withStyles(useStyles)(ReadyToLaunch);
