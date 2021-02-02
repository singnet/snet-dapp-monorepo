import React, { useRef, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InfoIcon from "@material-ui/icons/Info";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

import { useStyles } from "./styles";
import StyledDropdown from "shared/dist/components/StyledDropdown";
import SNETTextfield from "shared/dist/components/SNETTextfield";
import SNETButton from "shared/dist/components/SNETButton";
import { keyCodes } from "shared/dist/utils/keyCodes";
import { aiServiceDetailsActions } from "../../../../Services/Redux/actionCreators";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import validator from "shared/dist/utils/validator";
import { servicePricingValidationConstraints, daemonValidationConstraints } from "../validationConstraints";
import { agiToCogs } from "shared/dist/utils/Pricing";
import { cogsToAgi } from "shared/dist/utils/Pricing";

import AlertText from "shared/dist/components/AlertText";

const selectState = state => ({
  orgGroups: state.organization.groups,
});

const Region = ({ changeGroups, serviceGroups, invalidFields }) => {
  const classes = useStyles();
  const [showRegion] = useState(true);
  const { orgGroups } = useSelector(selectState);
  const endpointRef = useRef(null);
  const addressRef = useRef(null);
  const dispatch = useDispatch();
  const [alert, setAlert] = useState({});
  const [freeCallsValidation, setfreeCallsValidation] = useState({});
  const [priceValidation, setPriceValidation] = useState({});
  const [daemonAddressValidation, setDaemonAddressValidation] = useState({});

  const selectedServiceGroup = serviceGroups[0];
  const selectedServicePricing = selectedServiceGroup.pricing ? selectedServiceGroup.pricing[0] : {};

  const selectedOrgGroup = orgGroups[0];

  const handleEndPointValidation = value => {
    const isNotValid = validator.validators.validURL(value, { message: `${value} is not a valid endpoint` });
    if (isNotValid) {
      setAlert({ type: alertTypes.ERROR, message: isNotValid });
      return false;
    }
    return true;
  };

  const handleNewEndpointsChangeOnKeyPress = event => {
    if (event.keyCode !== keyCodes.enter) {
      return;
    }
    handleNewEndpointsChange();
  };
  const handleNewEndpointsChange = () => {
    dispatch(aiServiceDetailsActions.setServiceTouchedFlag(true));
    const newEndpoints = endpointRef.current.value;
    let updatedEndpoints = { ...selectedServiceGroup.endpoints };
    const userInputEndpoints = newEndpoints.split(",");
    userInputEndpoints.forEach(endpoint => {
      endpoint = endpoint.replace(/\s/g, "");
      if (endpoint && handleEndPointValidation(endpoint)) {
        updatedEndpoints = {
          ...updatedEndpoints,
          [endpoint]: { ...selectedServiceGroup[endpoint], valid: false },
        };
        setAlert({ type: alertTypes.ERROR, message: "" });
      } else {
        updatedEndpoints = { ...selectedServiceGroup.endpoints };
      }
    });
    const updatedServiceGroups = [...serviceGroups];
    updatedServiceGroups[0] = {
      ...selectedServiceGroup,
      endpoints: updatedEndpoints,
      id: selectedOrgGroup.id,
      name: selectedOrgGroup.name,
    };
    if (isEmpty(updatedServiceGroups[0].testEndpoints)) {
      const endpoint = Object.keys(updatedServiceGroups[0].endpoints)[0];
      updatedServiceGroups[0].testEndpoints = [endpoint];
    }
    changeGroups(updatedServiceGroups);
    endpointRef.current.value = "";
  };

  const handleEndpointDelete = endpoint => {
    dispatch(aiServiceDetailsActions.setServiceTouchedFlag(true));
    const updatedEndpoints = { ...selectedServiceGroup.endpoints };
    delete updatedEndpoints[endpoint];
    const updatedServiceGroups = [...serviceGroups];
    updatedServiceGroups[0] = { ...selectedServiceGroup, endpoints: updatedEndpoints };
    changeGroups(updatedServiceGroups);
  };

  const validateDaemonAddress = value => {
    const isNotValid = validator.single(value, daemonValidationConstraints);
    if (isNotValid) {
      setDaemonAddressValidation({
        type: alertTypes.ERROR,
        message: `${value} is not a valid daemon address`,
      });
      return false;
    }
    setDaemonAddressValidation({
      type: alertTypes.ERROR,
      message: "",
    });
    return true;
  };
  const handleNewDaemonAddressChangeOnKeyPress = event => {
    const value = event.target.value;
    if (event.keyCode !== keyCodes.enter) {
      return;
    }
    if (validateDaemonAddress(value)) {
      handleNewDaemonAddressChange();
    }
  };
  const handleNewDaemonAddressChange = () => {
    dispatch(aiServiceDetailsActions.setServiceTouchedFlag(true));
    const newAddresses = addressRef.current.value;
    let updatedAddresses = [...selectedServiceGroup.daemonAddresses];
    newAddresses.split(",").forEach(address => {
      address = address.replace(/\s/g, "");
      if (address) {
        const index = selectedServiceGroup.daemonAddresses.findIndex(el => el === address);
        if (index === -1) {
          updatedAddresses.push(address);
        }
      }
    });
    const updatedServiceGroups = [...serviceGroups];
    updatedServiceGroups[0] = {
      ...selectedServiceGroup,
      daemonAddresses: updatedAddresses,
      id: selectedOrgGroup.id,
      name: selectedOrgGroup.name,
    };
    changeGroups(updatedServiceGroups);
    addressRef.current.value = "";
  };

  const handleDaemonAddressDelete = address => {
    dispatch(aiServiceDetailsActions.setServiceTouchedFlag(true));
    const updatedAddresses = [...selectedServiceGroup.daemonAddresses];
    const index = updatedAddresses.findIndex(el => el === address);
    updatedAddresses.splice(index, 1);
    const updatedServiceGroups = [...serviceGroups];
    updatedServiceGroups[0] = { ...selectedServiceGroup, daemonAddresses: updatedAddresses };
    changeGroups(updatedServiceGroups);
  };

  const handleFreeCallsValidation = value => {
    if (value === "") return;
    const isNotValid = validator.single(value, servicePricingValidationConstraints.freeCallsAllowed);
    if (isNotValid) {
      return setfreeCallsValidation({
        type: alertTypes.ERROR,
        message: "Free calls value should be greater than or equal to 0",
      });
    }
    return setfreeCallsValidation({ type: alertTypes.SUCCESS, message: "" });
  };

  const handleFreeCallsChange = event => {
    const { value } = event.target;
    dispatch(aiServiceDetailsActions.setServiceTouchedFlag(true));
    handleFreeCallsValidation(value);
    const updatedServiceGroups = [...serviceGroups];
    updatedServiceGroups[0] = {
      ...selectedServiceGroup,
      freeCallsAllowed: value,
      id: selectedOrgGroup.id,
      name: selectedOrgGroup.name,
    };
    changeGroups(updatedServiceGroups);
  };

  const handlePriceValidation = value => {
    const isNotValid = validator.single(value, servicePricingValidationConstraints.price);
    if (isNotValid) {
      return setPriceValidation({
        type: alertTypes.ERROR,
        message: `Price of the service should be greater than or equal to ${cogsToAgi(1)} AGI.`,
      });
    }
    return setPriceValidation({ type: alertTypes.SUCCESS, message: "" });
  };
  const handlePriceChange = event => {
    let { value } = event.target;
    dispatch(aiServiceDetailsActions.setServiceTouchedFlag(true));
    handlePriceValidation(value);
    value = agiToCogs(value);
    const updatedServicePricing = [...selectedServiceGroup.pricing];
    updatedServicePricing[0] = { ...selectedServicePricing, priceInCogs: value };
    const updatedServiceGroups = [...serviceGroups];
    updatedServiceGroups[0] = {
      ...selectedServiceGroup,
      pricing: updatedServicePricing,
      id: selectedOrgGroup.id,
      name: selectedOrgGroup.name,
    };
    changeGroups(updatedServiceGroups);
  };
  if (showRegion) {
    return (
      <div>
        <div className={classes.dropDownBtn}>
          <StyledDropdown
            name="default_group"
            value="default_group"
            list={[{ value: "default_group", label: "default_group" }]}
          />
        </div>
        <Grid container className={classes.grayBox}>
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.regionNameIdContainer}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography className={classes.header}>Region Name</Typography>
              <Typography className={classes.value}>North America</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.servicePriceModelContainer}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <SNETTextfield
                icon
                name="price"
                defaultValue={selectedServicePricing && cogsToAgi(selectedServicePricing.priceInCogs)}
                label="AI Service Price (in AGI)"
                onChange={handlePriceChange}
                error={!!invalidFields ? "pricing" in invalidFields : false}
              />
              <AlertText type={priceValidation.type} message={priceValidation.message} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} className={classes.entityTypeDropDown}>
              <StyledDropdown
                inputLabel="Entity Type"
                value={selectedServicePricing && selectedServicePricing.priceModel}
                list={[{ value: "fixed_price", label: "Fixed price per call" }]}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <SNETTextfield
              icon
              name="freeCallsAllowed"
              value={selectedServiceGroup.freeCallsAllowed}
              label="Demo Free Calls"
              onChange={handleFreeCallsChange}
            />
            <AlertText type={freeCallsValidation.type} message={freeCallsValidation.message} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <SNETTextfield
              icon
              name="endpoints"
              inputRef={endpointRef}
              onKeyUp={handleNewEndpointsChangeOnKeyPress}
              label="Daemon Endpoints"
              description="Enter all the public Daemon end points that will be used to call the service."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleNewEndpointsChange}>+</IconButton>
                  </InputAdornment>
                ),
              }}
              error={!!invalidFields ? "endpoints" in invalidFields : false}
            />
          </Grid>
          <AlertBox type={alert.type} message={alert.message} />

          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.addedEndpointsContainer}>
            <div className={classes.infoIconContainer}>
              <InfoIcon />
            </div>
            <div className={classes.cardContainer}>
              <span className={classes.label}>Added Endpoints</span>
              <Card className={classes.card}>
                {selectedServiceGroup.endpoints &&
                  Object.entries(selectedServiceGroup.endpoints).map(([key]) => (
                    <Chip
                      className={classes.chip}
                      key={key}
                      label={key}
                      color="primary"
                      onDelete={() => handleEndpointDelete(key)}
                    />
                  ))}
              </Card>
              <span className={classes.extraInfo}>You can add up to 20 endpoints</span>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <SNETTextfield
              icon
              name="daemonAdresses"
              inputRef={addressRef}
              onKeyUp={handleNewDaemonAddressChangeOnKeyPress}
              label="Daemon Addresses"
              description="Daemon address is the Ethereum public address , this was introduced to help say when Daemon
               wants to talk / send some information to a third party ( ex Metering stats) , the third party can know
               if the request came in from an Authentic Daemon , Deamon will have the pvt key associated to this address
                in its configuration and will sign using this pvt key when making any requests to other systems."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleNewDaemonAddressChange}>+</IconButton>
                  </InputAdornment>
                ),
              }}
              error={!!invalidFields ? "daemonAddresses" in invalidFields : false}
            />
            <AlertBox type={daemonAddressValidation.type} message={daemonAddressValidation.message} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.addedEndpointsContainer}>
            <div className={classes.infoIconContainer}>
              <InfoIcon />
            </div>
            <div className={classes.cardContainer}>
              <span className={classes.label}>Added Addresses</span>
              <Card className={classes.card}>
                {selectedServiceGroup.daemonAddresses &&
                  selectedServiceGroup.daemonAddresses.map(address => (
                    <Chip
                      className={classes.chip}
                      key={address}
                      label={address}
                      color="primary"
                      onDelete={() => handleDaemonAddressDelete(address)}
                    />
                  ))}
              </Card>
              <span className={classes.extraInfo}>You can add up to 20 addresses</span>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }

  return (
    <div className={classes.addRegionBtn}>
      <SNETButton
        children="No region selected. Add atleast one region to continue."
        color="primary"
        variant="contained"
        disabled
      />
    </div>
  );
};

export default Region;
