import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import InfoIcon from "@material-ui/icons/Info";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

import SNETImageUpload from "shared/dist/components/SNETImageUpload";
import DummyCardImg from "shared/dist/assets/images/dummy-card.png";
import SNETTextfield from "shared/dist/components/SNETTextfield";
import SNETTextarea from "shared/dist/components/SNETTextarea";
import SNETButton from "shared/dist/components/SNETButton";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import AlertText from "shared/dist/components/AlertText";
import validator from "shared/dist/utils/validator";
import { serviceProfileValidationConstraints } from "./validationConstraints";
import ValidationError from "shared/dist/utils/validationError";
import { checkIfKnownError } from "shared/dist/utils/error";
import { keyCodes } from "shared/dist/utils/keyCodes";
import { ServiceCreationRoutes } from "../ServiceCreationRouter/Routes";
import { aiServiceDetailsActions } from "../../../Services/Redux/actionCreators";
import { useStyles } from "./styles";
import { assetTypes } from "../../../Utils/FileUpload";
import { base64ToArrayBuffer } from "shared/dist/utils/FileUpload";
import ServiceIdAvailability from "./ServiceIdAvailability";
import { serviceIdAvailability } from "../constant";
import { GlobalRoutes } from "../../../GlobalRouter/Routes";
import { generateDetailedErrorMessageFromValidation } from "../../../Utils/validation";
import isEmpty from "lodash/isEmpty";

let validateTimeout = "";

const selectState = state => ({
  isValidateServiceIdLoading: state.loader.validateServiceId.isLoading,
});

const Profile = ({ classes, serviceDetails, changeServiceDetailsLeaf, changeHeroImage, setServiceDetailsInRedux }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { orgUuid } = useParams();
  const { isValidateServiceIdLoading } = useSelector(selectState);
  const [tags, setTags] = useState(""); // Only to render in the chip comp
  const [alert, setAlert] = useState({});
  const [websiteValidation, setWebsiteValidation] = useState({});
  const [invalidFieldsFlag, setInvalidFieldsFlag] = useState();
  const invalidFields = validator(serviceDetails, serviceProfileValidationConstraints);

  const validateServiceId = serviceId => async () => {
    // Call the API to Validate the Service Id
    try {
      const serviceAvailability = await dispatch(aiServiceDetailsActions.validateServiceId(orgUuid, serviceId));
      dispatch(aiServiceDetailsActions.setServiceAvailability(serviceAvailability));
    } catch (error) {
      dispatch(aiServiceDetailsActions.setServiceAvailability(""));
    }
  };

  const debouncedValidate = (newServiceId, timeout = 200) => {
    if (newServiceId === serviceDetails.id || (serviceDetails.newId && Boolean(newServiceId))) {
      dispatch(aiServiceDetailsActions.setServiceAvailability(serviceIdAvailability.AVAILABLE));
      return clearTimeout(validateTimeout);
    }
    if (validateTimeout) {
      clearTimeout(validateTimeout);
    }
    validateTimeout = setTimeout(validateServiceId(newServiceId), timeout);
  };

  const handleWebsiteValidation = value => {
    const isNotValid = validator.single(value, serviceProfileValidationConstraints.projectURL);
    if (isNotValid) {
      return setWebsiteValidation({
        type: alertTypes.ERROR,
        message: `${value} is not a valid URL. URL should start with https:`,
      });
    }
    return setWebsiteValidation({ type: alertTypes.SUCCESS, message: "website is valid" });
  };

  const handleControlChange = event => {
    const { name, value } = event.target;
    if (name === "id") {
      changeServiceDetailsLeaf("newId", value);
      debouncedValidate(value);
    }
    if (name === "projectURL") {
      handleWebsiteValidation(value);
    }
    changeServiceDetailsLeaf(name, value);
  };

  const handleSave = async () => {
    if (serviceDetails.newId !== serviceDetails.id && serviceDetails.availability !== serviceIdAvailability.AVAILABLE) {
      throw new ValidationError("Service id is not available. Try with a different service id");
    }
    if (serviceDetails.touched) {
      setServiceDetailsInRedux(serviceDetails);
      await dispatch(aiServiceDetailsActions.saveServiceDetails(orgUuid, serviceDetails.uuid, serviceDetails));
    }

    return;
  };

  const handleContinue = async () => {
    try {
      if (invalidFields) {
        const isNotValid = Object.keys(invalidFields).map(key => invalidFields[key][0]);
        setInvalidFieldsFlag(true);
        if (isNotValid) {
          const errorMessage = generateDetailedErrorMessageFromValidation(isNotValid);
          return setAlert({ type: alertTypes.ERROR, children: errorMessage });
        }
      }
      await handleSave();
      history.push(
        ServiceCreationRoutes.DEMO.path.replace(":orgUuid", orgUuid).replace(":serviceUuid", serviceDetails.uuid)
      );
    } catch (error) {
      if (checkIfKnownError(error)) {
        return setAlert({ type: alertTypes.ERROR, message: error.message });
      }
      return setAlert({ type: alertTypes.ERROR, message: "something went wrong" });
    }
  };

  const handleAddTags = event => {
    if (event.keyCode === keyCodes.enter) {
      const localTags = tags;
      setTags("");
      handleKeyEnterInTags(localTags);
    }
  };

  const handleKeyEnterInTags = () => {
    const tagsEntered = tags.split(",");

    const localItems = serviceDetails.tags;

    tagsEntered.forEach(tag => {
      tag = tag.replace(/\s/g, "");
      if (!tag) {
        return;
      }
      const index = localItems.findIndex(el => el === tag);
      if (index === -1) {
        localItems.push(tag);
      }
      setTags("");
    });
    changeServiceDetailsLeaf("tags", localItems);
  };

  const handleDeleteTag = tag => {
    const localItems = serviceDetails.tags;
    const index = localItems.findIndex(el => el === tag);
    localItems.splice(index, 1);
    changeServiceDetailsLeaf("tags", localItems);
  };

  const handleResetImage = () => {
    changeHeroImage("");
  };
  const handleImageChange = async (data, mimeType, _encoding, filename) => {
    const arrayBuffer = base64ToArrayBuffer(data);
    const fileBlob = new File([arrayBuffer], filename, { type: mimeType });
    const { url } = await dispatch(
      aiServiceDetailsActions.uploadFile(assetTypes.SERVICE_ASSETS, fileBlob, orgUuid, serviceDetails.uuid)
    );
    changeHeroImage(url);
  };

  const handleFinishLater = async () => {
    try {
      await handleSave();
      history.push(GlobalRoutes.SERVICES.path.replace(":orgUuid", orgUuid));
    } catch (error) {
      if (checkIfKnownError(error)) {
        return setAlert({ type: alertTypes.ERROR, message: error.message });
      }
      return setAlert({ type: alertTypes.ERROR, message: "something went wrong" });
    }
  };

  return (
    <Grid container className={classes.profileContainer}>
      <Grid item sx={12} sm={12} md={12} lg={12} className={classes.box}>
        <Typography variant="h6">AI Service Profile Information</Typography>
        <div className={classes.wrapper}>
          <Typography className={classes.description}>
            Please enter the description and details of the service you wish to add to the AI marketplace, making sure
            your descriptions are clear as this will be displayed on the AI marketplace.
          </Typography>
          <SNETTextfield
            icon
            name="name"
            label="AI Service Name"
            minCount={serviceDetails.name.length}
            maxCount={50}
            description="The name of your service has to be unique within your organization"
            value={serviceDetails.name}
            onChange={handleControlChange}
            error={typeof invalidFieldsFlag !== "undefined" && !isEmpty(invalidFields) ? "name" in invalidFields : ""}
          />
          <div className={classes.serviceIdContainer}>
            <SNETTextfield
              icon
              name="id"
              label="AI Service Id"
              minCount={serviceDetails.newId.length}
              maxCount={50}
              description="The ID of your service has to be unique withing your organization"
              value={serviceDetails.newId}
              onChange={handleControlChange}
              error={
                typeof invalidFieldsFlag !== "undefined" && !isEmpty(invalidFields) ? "id" in invalidFields : false
              }
            />
          </div>
          <ServiceIdAvailability
            serviceDetails={serviceDetails}
            id={serviceDetails.newId || serviceDetails.id}
            availability={serviceDetails.availability}
            classes={classes}
            loading={isValidateServiceIdLoading}
          />
          <div className={classes.shortDescContainer}>
            <SNETTextarea
              showInfoIcon
              name="shortDescription"
              label="Short Description"
              minCount={serviceDetails.shortDescription.length}
              maxCount={160}
              rowCount={3}
              colCount={105}
              value={serviceDetails.shortDescription}
              onChange={handleControlChange}
              error={
                typeof invalidFieldsFlag !== "undefined" && !isEmpty(invalidFields)
                  ? "shortDescription" in invalidFields
                  : false
              }
            />
          </div>

          <div className={classes.longDescContainer}>
            <SNETTextarea
              showInfoIcon
              name="longDescription"
              label="Long Description"
              minCount={serviceDetails.longDescription.length}
              maxCount={5000}
              rowCount={8}
              colCount={105}
              value={serviceDetails.longDescription}
              onChange={handleControlChange}
              error={
                typeof invalidFieldsFlag !== "undefined" && !isEmpty(invalidFields)
                  ? "longDescription" in invalidFields
                  : false
              }
            />
          </div>

          <SNETTextfield
            icon
            name="tags"
            label="Input Tags"
            extraInfo="Insert multiple items separated by comma, hit enter to add"
            value={tags}
            onKeyUp={handleAddTags}
            onChange={e => setTags(e.target.value.toLowerCase())}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleKeyEnterInTags}>+</IconButton>
                </InputAdornment>
              ),
            }}
            error={
              typeof invalidFieldsFlag !== "undefined" && !isEmpty(invalidFields) ? "tags" in invalidFields : false
            }
          />
          <div className={classes.addedTagsContainer}>
            <div>
              <InfoIcon />
              <span className={classes.addTagLabel}>Added Tags</span>
              <Card className={classes.card}>
                {serviceDetails.tags.map(tag => (
                  <Chip
                    className={classes.chip}
                    key={tag}
                    label={tag}
                    color="primary"
                    onDelete={() => handleDeleteTag(tag)}
                  />
                ))}
              </Card>
            </div>
            <span className={classes.addTagExtraInfo}>You can add up to 20 tag items</span>
          </div>

          <div className={classes.projUrlContainer}>
            <SNETTextfield
              name="projectURL"
              label="Project URL"
              description="The website URL of the service will be displayed to users under your AI service page. GitHub links are recommended."
              value={serviceDetails.projectURL}
              onChange={handleControlChange}
              error={
                typeof invalidFieldsFlag !== "undefined" && !isEmpty(invalidFields)
                  ? "projectURL" in invalidFields
                  : false
              }
            />
            <AlertText type={websiteValidation.type} message={websiteValidation.message} />
          </div>
          <div className={classes.contributorsContainer}>
            <SNETTextfield
              icon
              name="contributors"
              label="Contributors"
              minCount={serviceDetails.contributors.length}
              maxCount={100}
              value={serviceDetails.contributors}
              onChange={handleControlChange}
              error={
                typeof invalidFieldsFlag !== "undefined" && !isEmpty(invalidFields)
                  ? "contributors" in invalidFields
                  : false
              }
            />
          </div>
          <div className={classes.profileImgContainer}>
            <Typography variant="subtitle1">AI Service Profile Image</Typography>
            <div className={classes.uploaderContentConatiner}>
              <div className={classes.imgUploader}>
                <SNETImageUpload
                  disableUrlTab
                  imageName="service-hero-image"
                  imageDataFunc={handleImageChange}
                  outputImage={serviceDetails.assets.heroImage.url}
                  outputImageName="service_hero_image"
                  outputFormat="image/*"
                  disableComparisonTab
                  disableInputTab={Boolean(serviceDetails.assets.heroImage.url)}
                  outputImageType="url"
                  disableResetButton={false}
                  disableDownloadButton={true}
                  error={
                    typeof invalidFieldsFlag !== "undefined" && !isEmpty(invalidFields)
                      ? "assets.heroImage.url" in invalidFields
                      : false
                  }
                />
              </div>
              {serviceDetails.assets.heroImage.url ? (
                <SNETButton children="reset" onClick={() => handleResetImage()} color="secondary" variant="text" />
              ) : null}
              <div className={classes.profileImgContent}>
                <Typography variant="subtitle2">
                  Every AI service will have a profile image. We recommend an image that is 906 x 504 in size. You can
                  preview how it will look on the AI Marketplace.
                </Typography>
                <Typography variant="subtitle2">
                  We encourage to find a representative image for your service that will attract users to explore your
                  page and service.
                </Typography>
              </div>
            </div>
            <div className={classes.images}>
              <div className={classes.largeImg}>
                <img src={serviceDetails.assets.heroImage.url || DummyCardImg} alt="Large Size" />
                <Typography className={classes.imgDimensionDetails}>302 x 168 | 32-bit PNG or JPG </Typography>
              </div>
              <div className={classes.smallerImg}>
                <img src={serviceDetails.assets.heroImage.url || DummyCardImg} alt="Small Size" />
                <Typography className={classes.imgDimensionDetails}>207 x 115 | 32-bit PNG or JPG </Typography>
              </div>
            </div>
          </div>
          <div className={classes.alertContainer}>
            <AlertBox type={alert.type} message={alert.message} children={alert.children} />
          </div>
        </div>
      </Grid>

      <Grid item sx={12} sm={12} md={12} lg={12} className={classes.btnContainer}>
        <SNETButton children="finish later" color="primary" variant="text" onClick={handleFinishLater} />
        {/*<SNETButton children="preview" color="primary" variant="contained" />*/}
        <SNETButton children="continue" color="primary" variant="contained" onClick={handleContinue} />
      </Grid>
    </Grid>
  );
};
export default withStyles(useStyles)(Profile);
