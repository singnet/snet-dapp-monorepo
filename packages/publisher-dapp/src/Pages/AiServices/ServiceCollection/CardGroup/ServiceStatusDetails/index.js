import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";

import SNETButton from "shared/dist/components/SNETButton";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import Revenue from "./Revenue";
import Usage from "./Usage";
import Pricing from "./Pricing";
import Changelog from "./Changelog";
import { useStyles } from "./styles";
import { ConfigurationServiceRequest } from "../../../../../Utils/Daemon/ConfigurationService";

const ServiceStatusDetails = props => {
  const { classes, status, groups, editServiceLink } = props;
  const [activeTab] = useState(2);
  const [alert, setAlert] = useState({});
  const [setinvalidValues] = useState([]);
  const tabs = [
    { name: "Revenue", activeIndex: 0, component: <Revenue /> },
    { name: "Usage", activeIndex: 1, component: <Usage /> },
    { name: "Pricing", activeIndex: 2, component: <Pricing groups={groups} /> },
    { name: "Changelog", activeIndex: 3, component: <Changelog /> },
  ];

  const configValidation = [
    ["blockchain_enabled", "false"],
    ["ipfs_end_point", "http://ipfs.singularitynet.io:80"],
    ["blockchain_network_selected", "ropsten"],
    ["passthrough_enabled", "false"],
    ["organization_id", "sohit1"],
    ["service_id", "sohit1"],
    ["daemon_end_point", "0.0.0.0:8083"],
    ["passthrough_endpoint", "http://localhost:7003"],
  ];

  const activeComponent = tabs.find(el => el.activeIndex === activeTab);
  // TODO use the appropriate endpoint of the service's daemon
  const validateDaemonConfig = async () => {
    const serviceEndpoint = "https://example-service-a.singularitynet.io:8083";
    const configurationServiceRequest = new ConfigurationServiceRequest(serviceEndpoint);
    const res = await configurationServiceRequest.getConfiguration();

    res.currentConfigurationMap.map(item => {
      configValidation.map(item1 => {
        if (item[0] === item1[0]) {
          if (item[1] !== item1[1]) {
            setinvalidValues([item1[0], item1[1]]);
            setAlert({ type: alertTypes.ERROR, message: item1[0] + " should be " + item1[1] });
          }
        }
        return null;
      });
      return setinvalidValues;
    });
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
        <SNETButton children="pause service" color="primary" variant="contained" />
        <br />
        {props.status === "APPROVED" ? (
          <SNETButton children="validate daemon" color="primary" variant="contained" onClick={validateDaemonConfig} />
        ) : null}
        <AlertBox type={alert.type} message={alert.message} />
      </div>
    </div>
  );
};
export default withStyles(useStyles)(ServiceStatusDetails);
