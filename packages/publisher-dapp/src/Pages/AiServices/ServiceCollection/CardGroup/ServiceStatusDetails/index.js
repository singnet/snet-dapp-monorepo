import React, { Fragment, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import WarningIcon from "@material-ui/icons/Warning";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import SNETButton from "shared/dist/components/SNETButton";

import Pricing from "./Pricing";
import { useStyles } from "./styles";
import { ConfigurationServiceRequest } from "../../../../../Utils/Daemon/ConfigurationService";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import { aiServiceDetailsActions, loaderActions } from "../../../../../Services/Redux/actionCreators";
import { checkIfKnownError } from "shared/dist/utils/error";
import { serviceCreationStatus } from "../../../../AiServiceCreation/constant";
import { ServiceCreationRoutes } from "../../../../AiServiceCreation/ServiceCreationRouter/Routes";
import DaemonConfigModal from "../../../DaemonConfigModal";
import { LoaderContent } from "../../../../../Utils/Loader";
import createInvalidEndpointsAlert from "./createInvalidEndpointsAlert";

const selectState = state => ({
  serviceDetails: state.aiServiceList,
});
const ServiceStatusDetails = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { classes, status, groups, serviceUuid, orgUuid, orgId, serviceId } = props;
  const [activeTab] = useState(2);
  const { serviceDetails } = useSelector(selectState);
  const [alert, setAlert] = useState({});
  const [verifyDaemonAlert, setVerifyDaemonAlert] = useState({
    type: alertTypes.WARNING,
    message: "The test will ensure the protocols are working correctly. No ETH 'gas' transaction fee will incur",
    header: "Verify This Service",
    icon: WarningIcon,
  });
  const [showDaemonConfigModal, setShowDaemonConfigModal] = useState(false);
  const [mainnetDaemonConfig, setMainnetDaemonConfig] = useState({});
  const Networks = {
    1: "main",
    3: "ropsten",
  };
  const configValidation = [
    ["blockchain_enabled", "true"],
    ["ipfs_end_point", "http://ipfs.singularitynet.io:80"],
    ["blockchain_network_selected", Networks[process.env.REACT_APP_ETH_NETWORK]],
    ["passthrough_enabled", "true"],
    ["organization_id", orgId],
    ["service_id", serviceId],
  ];
  /*
  const tabs = [
    { name: "Revenue", activeIndex: 0, component: <Revenue /> },
    { name: "Usage", activeIndex: 1, component: <Usage /> },
    { name: "Pricing", activeIndex: 2, component: <Pricing groups={groups} /> },
    { name: "Changelog", activeIndex: 3, component: <Changelog /> },
  ];
*/
  const tabs = [{ name: "Pricing", activeIndex: 2, component: <Pricing groups={groups} /> }];
  const activeComponent = tabs.find(el => el.activeIndex === activeTab);

  const validateDaemonConfig = async () => {
    try {
      setAlert({});
      const daemonConfig = await dispatch(aiServiceDetailsActions.getSampleDaemonConfig(orgUuid, serviceUuid, false));
      dispatch(loaderActions.startAppLoader(LoaderContent.METAMASK_TRANSACTION));
      setMainnetDaemonConfig(daemonConfig);
      setVerifyDaemonAlert({ ...verifyDaemonAlert, type: alertTypes.WARNING, message: "" });
      const selectedService = serviceDetails.data.find(({ uuid }) => serviceUuid === uuid);
      const invalidEndpoints = [];
      const validEndpoints = [];
      let signature = "";
      let currentBlock;

      for (let j = 0; j < selectedService.groups.length; j++) {
        const group = selectedService.groups[j];
        const endpoints = Object.keys(group.endpoints);
        for (let index = 0; index < endpoints.length; index++) {
          const endpoint = endpoints[index];
          const configurationServiceRequest = new ConfigurationServiceRequest(endpoint);
          if (!signature) {
            currentBlock = await configurationServiceRequest.getCurrentBlockNumber();
            signature = await configurationServiceRequest.generateSignatureForGetConfiguration(currentBlock);
          }
          dispatch(loaderActions.startAppLoader(LoaderContent.VALIDATING_DAEMON_ENDPOINTS));
          try {
            const res = await configurationServiceRequest.getConfiguration(signature, currentBlock);
            res.currentConfigurationMap.forEach(element => {
              configValidation.forEach(element1 => {
                if (element[0] === element1[0]) {
                  if (element[1] !== element1[1]) {
                    if (!invalidEndpoints.includes(endpoint)) {
                      invalidEndpoints.push(endpoint);
                    }
                  }
                }
              });
            });
            if (!invalidEndpoints.includes(endpoint)) {
              validEndpoints.push(endpoint);
            }
          } catch (error) {
            invalidEndpoints.push(endpoint);
          }
        } // End of Endpoints iteration
      } // End of Groups Iteration
      const validatedEndpoints = {
        ...invalidEndpoints.reduce((acc, cur) => {
          acc[cur] = { valid: false };
          return acc;
        }, {}),
        ...validEndpoints.reduce((acc, cur) => {
          acc[cur] = { valid: true };
          return acc;
        }, {}),
      };
      const serviceDetailsToPatch = { groups: [...selectedService.groups] };
      serviceDetailsToPatch.groups[0] = {
        ...selectedService.groups[0],
        endpoints: validatedEndpoints,
      };
      const patchGroups = aiServiceDetailsActions.generateGroupsPayload(
        serviceDetailsToPatch.groups,
        serviceDetailsToPatch.groups[0].freeCallSignerAddress
      );
      serviceDetailsToPatch.groups = patchGroups;
      dispatch(loaderActions.startAppLoader(LoaderContent.SAVE_SERVICE_DETAILS));
      await dispatch(aiServiceDetailsActions.patchServiceDetails(orgUuid, serviceUuid, serviceDetailsToPatch));
      if (isEmpty(invalidEndpoints)) {
        dispatch(loaderActions.stopAppLoader());
        return setVerifyDaemonAlert({
          type: alertTypes.SUCCESS,
          message: "All protocols tested positive",
          header: "Verification Sucessful",
          icon: CheckCircleIcon,
        });
      }
      const invalidEndpointsAlertMessage = createInvalidEndpointsAlert(invalidEndpoints, setShowDaemonConfigModal);
      setVerifyDaemonAlert({
        type: alertTypes.ERROR,
        message: invalidEndpointsAlertMessage,
        header: "Verification failed for following endpoints",
        icon: WarningIcon,
      });
      dispatch(loaderActions.stopAppLoader());
    } catch (error) {
      dispatch(loaderActions.stopAppLoader());
      if (checkIfKnownError) {
        return setAlert({ type: alertTypes.ERROR, message: error.message });
      }

      return setAlert({ type: alertTypes.ERROR, message: "something went wrong" });
    }
  };

  const handleEdit = () => {
    const path = ServiceCreationRoutes.PROFILE.path;
    const redirectTo = path.replace(":orgUuid", orgUuid).replace(":serviceUuid", serviceUuid);
    history.push(redirectTo);
  };

  const handleApproved = () => {
    const path = ServiceCreationRoutes.SUBMIT.path;
    const redirectTo = path.replace(":orgUuid", orgUuid).replace(":serviceUuid", serviceUuid);
    history.push(redirectTo);
  };

  return (
    <Fragment>
      <DaemonConfigModal
        open={showDaemonConfigModal}
        handleClose={() => setShowDaemonConfigModal(false)}
        daemonConfig={mainnetDaemonConfig}
      />
      <div className={classes.serviceStatusDetailsMainContainer}>
        <div>
          <div className={classes.statusDetails}>
            <Typography className={classes.property}>status</Typography>
            <Typography data-status-type={status} className={classes.value}>
              {status}
            </Typography>
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

        {props.status === "PUBLISHED" && (
          <AlertBox
            type={verifyDaemonAlert.type}
            message={verifyDaemonAlert.message}
            header={verifyDaemonAlert.header}
            icon={verifyDaemonAlert.icon}
          />
        )}

        <div className={classes.serviceStatusActions}>
          <SNETButton
            children="edit"
            color="primary"
            variant="contained"
            onClick={handleEdit}
            disabled={status === serviceCreationStatus.REJECTED}
          />
          {status === serviceCreationStatus.APPROVED && (
            <SNETButton
              children="publish"
              color="primary"
              variant="contained"
              onClick={handleApproved}
              disabled={status === serviceCreationStatus.REJECTED}
            />
          )}

          {props.status === "PUBLISHED" ? (
            <div className={classes.configValidButton}>
              <SNETButton
                children="validate daemon"
                color="primary"
                variant="contained"
                onClick={validateDaemonConfig}
              />
            </div>
          ) : null}
        </div>
        <br />
        <div>
          <AlertBox type={alert.type} message={alert.message} children={alert.children} />
        </div>
      </div>
    </Fragment>
  );
};
export default withStyles(useStyles)(ServiceStatusDetails);
