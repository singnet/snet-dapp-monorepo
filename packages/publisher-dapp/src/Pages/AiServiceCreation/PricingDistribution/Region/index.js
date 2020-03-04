import React, { useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InfoIcon from "@material-ui/icons/Info";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import { useSelector, useDispatch } from "react-redux";

import { useStyles } from "./styles";
import StyledDropdown from "shared/dist/components/StyledDropdown";
import SNETTextfield from "shared/dist/components/SNETTextfield";
import SNETButton from "shared/dist/components/SNETButton";
import { keyCodes } from "shared/dist/utils/keyCodes";
import { aiServiceDetailsActions } from "../../../../Services/Redux/actionCreators";

const selectState = state => ({
  serviceGroups: state.aiServiceDetails.groups,
  orgGroups: state.organization.groups,
});

const Region = () => {
  const classes = useStyles();
  const [showRegion] = useState(true);
  const { serviceGroups, orgGroups } = useSelector(selectState);
  const endpointRef = useRef(null);
  const testEndpointRef = useRef(null);
  const dispatch = useDispatch();

  const selectedServiceGroup = serviceGroups[0];
  const selectedServicePricing = selectedServiceGroup.pricing ? selectedServiceGroup.pricing[0] : {};

  const selectedOrgGroup = orgGroups[0];

  const updateGroupId = () => {
    if (!Boolean(selectedServiceGroup.id)) {
      const updatedServiceGroups = [...serviceGroups];
      updatedServiceGroups[0] = { ...selectedServiceGroup, id: selectedOrgGroup.id };
      dispatch(aiServiceDetailsActions.setAiServiceGroups(updatedServiceGroups));
    }
  };

  const handleNewEndpointsChange = event => {
    if (event.keyCode !== keyCodes.enter) {
      return;
    }
    const newEndpoints = endpointRef.current.value;
    const updatedEndpoints = [...selectedServiceGroup.endpoints];
    const userInputEndpoints = newEndpoints.split(",");
    userInputEndpoints.forEach(endpoint => {
      endpoint = endpoint.replace(/\s/g, "");
      if (endpoint) {
        const index = updatedEndpoints.findIndex(el => el === endpoint);
        if (index === -1) {
          updatedEndpoints.push(endpoint);
        }
      }
    });
    const updatedServiceGroups = [...serviceGroups];
    updatedServiceGroups[0] = { ...selectedServiceGroup, endpoints: updatedEndpoints };
    dispatch(aiServiceDetailsActions.setAiServiceGroups(updatedServiceGroups));
    endpointRef.current.value = "";
    updateGroupId();
  };

  const handleEndpointDelete = endpoint => {
    const index = selectedServiceGroup.endpoints.findIndex(el => el === endpoint);
    const updatedEndpoints = [...selectedServiceGroup.endpoints];
    updatedEndpoints.splice(index, 1);
    const updatedServiceGroups = [...serviceGroups];
    updatedServiceGroups[0] = { ...selectedServiceGroup, endpoints: updatedEndpoints };
    dispatch(aiServiceDetailsActions.setAiServiceGroups(updatedServiceGroups));
  };

  const handleNewTestEndpointsChange = event => {
    if (event.keyCode !== keyCodes.enter) {
      return;
    }
    const newEndpoints = testEndpointRef.current.value;
    const updatedEndpoints = [...selectedServiceGroup.testEndpoints];
    const userInputEndpoints = newEndpoints.split(",");
    userInputEndpoints.forEach(endpoint => {
      endpoint = endpoint.replace(/\s/g, "");
      if (endpoint) {
        const index = updatedEndpoints.findIndex(el => el === endpoint);
        if (index === -1) {
          updatedEndpoints.push(endpoint);
        }
      }
    });
    const updatedServiceGroups = [...serviceGroups];
    updatedServiceGroups[0] = { ...selectedServiceGroup, testEndpoints: updatedEndpoints };
    dispatch(aiServiceDetailsActions.setAiServiceGroups(updatedServiceGroups));
    testEndpointRef.current.value = "";
    updateGroupId();
  };

  const handleTestEndpointDelete = endpoint => {
    const index = selectedServiceGroup.testEndpoints.findIndex(el => el === endpoint);
    const updatedEndpoints = [...selectedServiceGroup.testEndpoints];
    updatedEndpoints.splice(index, 1);
    const updatedServiceGroups = [...serviceGroups];
    updatedServiceGroups[0] = { ...selectedServiceGroup, testEndpoints: updatedEndpoints };
    dispatch(aiServiceDetailsActions.setAiServiceGroups(updatedServiceGroups));
  };

  const handleFreeCallsChange = event => {
    const { value } = event.target;
    const updatedServiceGroups = [...serviceGroups];
    updatedServiceGroups[0] = { ...selectedServiceGroup, freeCallsAllowed: value };
    dispatch(aiServiceDetailsActions.setAiServiceGroups(updatedServiceGroups));
    updateGroupId();
  };

  const handlePriceChange = event => {
    const { value } = event.target;
    const updatedServicePricing = [...selectedServiceGroup.pricing];
    updatedServicePricing[0] = { ...selectedServicePricing, priceInCogs: value };
    const updatedServiceGroups = [...serviceGroups];
    updatedServiceGroups[0] = { ...selectedServiceGroup, pricing: updatedServicePricing };
    dispatch(aiServiceDetailsActions.setAiServiceGroups(updatedServiceGroups));
    updateGroupId();
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
                value={selectedServicePricing && selectedServicePricing.priceInCogs}
                label="Ai Service Price"
                onChange={handlePriceChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <StyledDropdown
                inputLabel="Entity Type"
                value={selectedServicePricing && selectedServicePricing.priceModel}
                list={[{ value: "fixed_price", label: "fixed_price" }]}
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
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <SNETTextfield
              icon
              name="endpoints"
              inputRef={endpointRef}
              onKeyUp={handleNewEndpointsChange}
              label="Daemon Endpoints"
              description="Enter all the public Daemon end points that will be used to call the service."
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.addedEndpointsContainer}>
            <div className={classes.infoIconContainer}>
              <InfoIcon />
            </div>
            <div className={classes.cardContainer}>
              <span className={classes.label}>Added Endpoints</span>
              <Card className={classes.card}>
                {selectedServiceGroup.endpoints &&
                  selectedServiceGroup.endpoints.map(endpoint => (
                    <Chip
                      className={classes.chip}
                      key={endpoint}
                      label={endpoint}
                      color="primary"
                      onDelete={() => handleEndpointDelete(endpoint)}
                    />
                  ))}
              </Card>
              <span className={classes.extraInfo}>You can add up to 20 endpoints</span>
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <SNETTextfield
              icon
              name="testEndpoints"
              inputRef={testEndpointRef}
              onKeyUp={handleNewTestEndpointsChange}
              label="Ropsten - Daemon Endpoints"
              description="Enter all the public Daemon end points that will be used to call the service in the ropsten network for testing the service."
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.addedEndpointsContainer}>
            <div className={classes.infoIconContainer}>
              <InfoIcon />
            </div>
            <div className={classes.cardContainer}>
              <span className={classes.label}>Added Endpoints</span>
              <Card className={classes.card}>
                {selectedServiceGroup.testEndpoints &&
                  selectedServiceGroup.testEndpoints.map(endpoint => (
                    <Chip
                      className={classes.chip}
                      key={endpoint}
                      label={endpoint}
                      color="primary"
                      onDelete={() => handleTestEndpointDelete(endpoint)}
                    />
                  ))}
              </Card>
              <span className={classes.extraInfo}>You can add up to 20 endpoints</span>
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
