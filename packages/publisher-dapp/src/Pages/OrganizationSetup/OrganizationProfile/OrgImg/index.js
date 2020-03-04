import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { useParams } from "react-router-dom";

import SNETImageUpload from "shared/dist/components/SNETImageUpload";
import { useStyles } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { organizationActions } from "../../../../Services/Redux/actionCreators";
import Reset from "./Reset";
import { base64ToArrayBuffer } from "shared/dist/utils/FileUpload";
import { assetTypes } from "../../../../Utils/FileUpload";

const OrgImg = ({ classes }) => {
  const { url } = useSelector(state => state.organization.assets.heroImage);
  const { orgUuid } = useParams();
  const dispatch = useDispatch();

  const handleImageChange = async (data, mimeType, _encoding, filename) => {
    const arrayBuffer = base64ToArrayBuffer(data);
    const fileBlob = new File([arrayBuffer], filename, { type: mimeType });
    const { url } = await dispatch(organizationActions.uploadFile(assetTypes.ORG_ASSETS, fileBlob, orgUuid));
    dispatch(organizationActions.setOrgHeroImageUrl(url));
  };

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} className={classes.orgImgContainer}>
      <Typography className={classes.title}>Organisation Profile Image</Typography>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.profileImgContainer}>
        <Grid item xs={12} sm={6} md={6} lg={6} className={classes.orgProfileImg}>
          <SNETImageUpload
            disableUrlTab
            imageName="org-hero-image"
            imageDataFunc={handleImageChange}
            outputImage={url}
            outputImageName="organization_hero_image"
            outputFormat="image/*"
            disableComparisonTab
            disableInputTab={Boolean(url)}
            outputImageType="url"
          />
          <Reset onReset={() => handleImageChange(null, null)} />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} className={classes.previewContainer}>
          <Typography className={classes.previewText}>
            Every organization will have has a profile image. We recommend an image that is 906 x 504 in size. You can
            preview how it will look on the AI Marketpalce.
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
