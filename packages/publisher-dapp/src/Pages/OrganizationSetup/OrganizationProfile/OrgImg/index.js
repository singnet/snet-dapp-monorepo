import React, { useRef, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { useParams } from "react-router-dom";

import SNETImageUpload from "shared/dist/components/SNETImageUpload";
import { useStyles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { organizationActions } from "../../../../Services/Redux/actionCreators";
import Reset from "./Reset";
import { base64ToArrayBuffer } from "shared/dist/utils/FileUpload";
import { assetTypes } from "../../../../Utils/FileUpload";
import { checkIfKnownError } from "shared/dist/utils/error";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";

const selectState = state => ({
  url: state.organization.assets.heroImage.url,
  foundInBlockchain: state.organization.foundInBlockchain,
});

const OrgImg = ({ classes, error }) => {
  const [imgUploadAlert, setImgUploadAlert] = useState({});
  const { url, foundInBlockchain } = useSelector(selectState);
  const imageRef = useRef(null);
  const { orgUuid } = useParams();

  const dispatch = useDispatch();

  const handleImageChange = async (data, mimeType, _encoding, filename) => {
    try {
      setImgUploadAlert({});
      const arrayBuffer = base64ToArrayBuffer(data);
      const fileBlob = new File([arrayBuffer], filename, { type: mimeType });
      const { url } = await dispatch(organizationActions.uploadFile(assetTypes.ORG_ASSETS, fileBlob, orgUuid));
      dispatch(organizationActions.setOrgHeroImageUrl(url));
    } catch (e) {
      imageRef.current.uploadedStateImg.current.src = "";
      if (checkIfKnownError(e)) {
        return setImgUploadAlert({ type: alertTypes.ERROR, message: e.message });
      }
      return setImgUploadAlert({ type: alertTypes.ERROR, message: "Unable to upload image. Please try later" });
    }
  };

  const handleResetImage = () => {
    dispatch(organizationActions.setOrgHeroImageUrl(""));
  };
  return (
    <Grid item xs={12} sm={12} md={12} lg={12} className={classes.orgImgContainer}>
      <Typography className={classes.title}>Organisation Profile Image</Typography>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.profileImgContainer}>
        <Grid item xs={12} sm={6} md={6} lg={6} className={classes.orgProfileImg}>
          <SNETImageUpload
            ref={imageRef}
            disableUrlTab
            imageName="org-hero-image"
            imageDataFunc={handleImageChange}
            outputImage={url}
            outputImageName="organization_hero_image"
            outputFormat="image/*"
            disableComparisonTab
            disableInputTab={Boolean(url)}
            outputImageType="url"
            error={error}
          />
          {url ? <Reset onReset={() => handleResetImage()} disabled={foundInBlockchain} /> : null}
          <AlertBox type={imgUploadAlert.type} message={imgUploadAlert.message} />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} className={classes.previewContainer}>
          <Typography className={classes.previewText}>
            Every organization will have a profile image. We recommend an image that is 906 x 504 in size. You can
            preview how it will look on the AI Marketplace.
          </Typography>
          <div className={classes.previewImg}>
            <div className={classes.previewLargeImg}>
              <Typography>Preview</Typography>
              <Avatar alt="Singularity" src={url} className={classes.largePreviewImg} />
            </div>
            <div className={classes.previewSmallImg}>
              <Avatar alt="Singularity" src={url} className={classes.smallPreviewImg} />
            </div>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(OrgImg);
