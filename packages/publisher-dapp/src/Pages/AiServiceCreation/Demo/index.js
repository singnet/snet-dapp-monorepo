import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";

import SNETButton from "shared/dist/components/SNETButton";
import { useStyles } from "./styles";
import Actions from "./Actions";
import UploadDemoFiles from "./UploadDemoFiles";

const Demo = ({ classes, serviceDetails, changeDemoFiles, setServiceDetailsInRedux }) => {
  const { orgUuid } = useParams();
  const [invalidFieldsFlag, setInvalidFieldsFlag] = useState();

  return (
    <Grid container className={classes.demoContainer}>
      <Grid item sx={12} sm={12} md={12} lg={12} className={classes.box}>
        <Typography variant="h6">Demo Setup</Typography>
        <div className={classes.wrapper}>
          <Typography className={classes.demoPageDescription}>
            AI publishers can create a unique demo experience that users on the AI Marketplace can engage with. A
            positive demo experience will encourage users to engage and integrate your AI into their applications. We
            encourage you to follow our best practices on how to properly set up your demo on our AI Marketplace.
            <span>The steps for creating a demo UI are:</span>
          </Typography>

          <div className={classes.stepOneContainer}>
            <Typography variant="subtitle1" className={classes.stepsHeading}>
              Step 1: Download DApp source code
            </Typography>
            <Typography variant="subtitle2">
              The DApp source code enables you to build and test the interface for your service. You can also peruse
              available UI components at &nbsp;
              <a
                href="http://custom-ui.singularitynet.io.s3-website-us-east-1.amazonaws.com/?path=/story/alerts-alertbox--live-source"
                target="_blank"
                rel="noopener noreferrer"
              >
                SingularityNet storybook{" "}
              </a>
              . This lists all common components used in the marketplace and can be reused for your service. Download
              the package from the following link and follow the instructions to set up a local environment.
            </Typography>
            <div className={classes.downloadBtn}>
              <a href="https://github.com/singnet/snet-dapp/archive/master.zip" download>
                <SNETButton children="download source code" color="primary" variant="contained" />
              </a>
            </div>
            <hr />
          </div>

          <div className={classes.stepTwoContainer}>
            <Typography variant="subtitle1" className={classes.stepsHeading}>
              Step 2: Set Up Local Test Environment (ensure your node version is 10.20.0 or later)
            </Typography>
            <Typography variant="subtitle2">
              Once you download the package extract the source code and follow the instructions detailed &nbsp;
              <a
                href="https://dev.singularitynet.io/docs/ai-developers/dapp-ui-component/"
                rel="noopener noreferrer"
                target="_blank"
              >
                here{" "}
              </a>
            </Typography>
            <div className={classes.stepTwoBtnsContaier}>
              <Typography variant="subtitle2">Getting stuck or have questions?</Typography>
              <SNETButton
                children="setup docs"
                color="primary"
                variant="text"
                href="https://dev.singularitynet.io/docs/ai-developers/dapp-ui-component/"
                target="_blank"
                rel="noopener nofollow"
              />
              {/*<SNETButton children="f.a.q" color="primary" variant="text" />*/}
              <SNETButton
                children="contact us"
                href="mailto:support@singularitynet.io"
                color="primary"
                variant="text"
                target="_blank"
              />
            </div>
            <hr />
          </div>

          <UploadDemoFiles
            classes={classes}
            orgUuid={orgUuid}
            serviceUuid={serviceDetails.uuid}
            demoFilesUrl={serviceDetails.assets.demoFiles.url}
            changeDemoFiles={changeDemoFiles}
            error={serviceDetails.assets.demoFiles.url ? "" : invalidFieldsFlag}
          />
        </div>
      </Grid>
      <Actions
        classes={classes}
        serviceDetails={serviceDetails}
        setServiceDetailsInRedux={setServiceDetailsInRedux}
        setInvalidFieldsFlag={setInvalidFieldsFlag}
      />
    </Grid>
  );
};
export default withStyles(useStyles)(Demo);
