import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import SNETImageUpload from "shared/dist/components/SNETImageUpload";
import { useStyles } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { organizationActions } from "../../../../Services/Redux/actionCreators";
import Reset from "./Reset";
import { mimeTypeToFileType } from "shared/dist/utils/image";
import { imgSrcInBase64 } from "shared/dist/utils/image";

const OrgImg = ({ classes }) => {
  const { raw: data, fileType: mimeType, url } = useSelector(state => state.organization.assets.heroImage);
  const dispatch = useDispatch();

  const handleImageChange = (data, mimeType) => {
    const fileType = mimeTypeToFileType(mimeType);
    dispatch(organizationActions.setHeroImage(data, fileType));
  };

  const imgSource = () => {
    if (url) {
      return url;
    }
    return Boolean(data) ? imgSrcInBase64(mimeType, data) : "";
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
            outputImage={imgSource()}
            outputImageName="organization_hero_image"
            outputFormat={mimeType}
            disableComparisonTab
            disableInputTab={Boolean(data) || Boolean(url)}
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
              <Avatar alt="Singularity" src={imgSource()} className={classes.largePreviewImg} />
            </div>
            <div className={classes.previewSmallImg}>
              <Avatar alt="Singularity" src={imgSource()} className={classes.smallPreviewImg} />
            </div>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(OrgImg);
