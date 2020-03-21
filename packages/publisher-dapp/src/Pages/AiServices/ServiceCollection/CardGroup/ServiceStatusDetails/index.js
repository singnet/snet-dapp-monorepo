import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SNETButton from "shared/dist/components/SNETButton";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import Revenue from "./Revenue";
import Usage from "./Usage";
import Pricing from "./Pricing";
import Changelog from "./Changelog";
import { useStyles } from "./styles";
import { ConfigurationServiceRequest } from "../../../../../Utils/Daemon/ConfigurationService";
import { aiServiceDetailsActions } from "../../../../../Services/Redux/actionCreators";
import { checkIfKnownError } from "shared/dist/utils/error";

const selectState = state => ({ serviceDetails: state.aiServiceList });
const selectstate1 = state => ({ groupDetails: state.aiServiceDetails });

const ServiceStatusDetails = props => {
  const { classes, status, groups, editServiceLink, serviceUuid, orgUuid } = props;
  const [activeTab] = useState(2);
  const [alert, setAlert] = useState({});
  const { serviceDetails } = useSelector(selectState);
  const { groupDetails } = useSelector(selectstate1);
  const dispatch = useDispatch();
  let DaemonConfigvalidateAlert = {};
  const tabs = [
    { name: "Revenue", activeIndex: 0, component: <Revenue /> },
    { name: "Usage", activeIndex: 1, component: <Usage /> },
    { name: "Pricing", activeIndex: 2, component: <Pricing groups={groups} /> },
    { name: "Changelog", activeIndex: 3, component: <Changelog /> },
  ];
  //Todo check for valid url    ["daemon_end_point", "0.0.0.0:8083"],    ["passthrough_endpoint", "http://localhost:7003"],
  const configValidation = [
    ["blockchain_enabled", "true"],
    ["ipfs_end_point", "http://ipfs.singularitynet.io:80"],
    ["blockchain_network_selected", "main"],
    ["passthrough_enabled", "true"],
    ["organization_id", { orgUuid }],
    ["service_id", { serviceUuid }],
  ];

  const activeComponent = tabs.find(el => el.activeIndex === activeTab);

  const getGrpcConfig = async endpoint => {
    const serviceEndpoint = endpoint;
    const configurationServiceRequest = new ConfigurationServiceRequest(serviceEndpoint);
    const res = await configurationServiceRequest.getConfiguration();
    res.currentConfigurationMap.forEach(element => {
      configValidation.forEach(element1 => {
        if (element[0] === element1[0]) {
          if (element[1] !== element1[1]) {
            DaemonConfigvalidateAlert = {
              type: alertTypes.ERROR,
              message: element1[0] + " should be " + element1[1],
            };
            setAlert(DaemonConfigvalidateAlert);
          }
        }
      });
    });
  };
  // TODO use the appropriate endpoint of the service's daemon
  const validateDaemonConfig = async () => {
    let checkEndpoint = true;
    try {
      groupDetails.groups.forEach(group => {
        if (!group.endpoints.length) {
          checkEndpoint = false;
        }
        group.endpoints.forEach(endpoint => {
          getGrpcConfig(endpoint);
        });
      });
    } catch (error) {
      if (checkIfKnownError(error)) {
        return setAlert({ type: alertTypes.ERROR, message: error.message });
      }
      return setAlert({ type: alertTypes.ERROR, message: "Something went wrong please try" });
    }
    if (DaemonConfigvalidateAlert && checkEndpoint) {
      saveApi();
    }
  };
  const saveApi = async () => {
    try {
      const result = serviceDetails.data.filter(({ uuid }) => serviceUuid === uuid);
      const { error } = await dispatch(
        aiServiceDetailsActions.saveServiceDetails(result[0].orgUuid, serviceUuid, result[0], true)
      );
      if (error.code) {
        throw new Error(error.message);
      }
    } catch (error) {
      if (checkIfKnownError(error)) {
        return setAlert({ type: alertTypes.ERROR, message: error.message });
      }
      return setAlert({ type: alertTypes.ERROR, message: "Unable to Validate , Please try later" });
    }
  };
  return (
    <div className={classes.serviceStatusDetailsMainContainer}>
      <div>
        <div className={classes.statusDetails}>
          <Typography className={classes.property}>status</Typography>
          <Typography className={classes.value}>{status}</Typography>
        </div>
        <div className={classes.tabsContainer}>
          <AppBar position="static" className={classes.tabsHeader}>
            <Tabs value={activeTab}>
              {tabs.map(value => (
                <Tab key={value.name} label={value.name} />
              ))}
            </Tabs>
          </AppBar>
          {activeComponent && activeComponent.component}
        </div>
      </div>
      <div className={classes.serviceStatusActions}>
        <Link to={editServiceLink}>
          <SNETButton children="edit" color="primary" variant="contained" />
        </Link>
        {props.status === "PUBLISHED" ? (
          <div className={classes.configValidButton}>
            <SNETButton children="pause service" color="primary" variant="contained" />
            <SNETButton children="validate daemon" color="primary" variant="contained" onClick={validateDaemonConfig} />
          </div>
        ) : null}
      </div>
      <br />
      <div>
        <AlertBox type={alert.type} message={alert.message} />
      </div>
    </div>
  );
};
export default withStyles(useStyles)(ServiceStatusDetails);
