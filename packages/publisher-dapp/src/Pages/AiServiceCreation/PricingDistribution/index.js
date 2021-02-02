import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

import { useStyles } from "./styles";
import Region from "./Region";
import UploadProto from "./UploadProto";
import AdvancedFields from "./AdvancedFields";
import Actions from "./Actions";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import { withStyles } from "@material-ui/styles";
import { aiServiceDetailsActions } from "../../../Services/Redux/actionCreators";

class PricingDistribution extends Component {
  state = {
    alert: { type: alertTypes.ERROR, message: "An error occurred while saving groups" },
    invalidFields: {},
  };

  componentDidMount = async () => {
    const { orgId, groupId, serviceId, username, getFreeCallSignerAddress, changeServiceDetailsLeaf } = this.props;
    const freeCallSignerAddress = await getFreeCallSignerAddress(orgId, groupId, serviceId, username);
    changeServiceDetailsLeaf("freeCallSignerAddress", freeCallSignerAddress);
  };

  componentDidUpdate = async prevProps => {
    const { orgId, groupId, serviceId, username, getFreeCallSignerAddress, changeServiceDetailsLeaf } = this.props;
    if (
      Boolean(orgId) &&
      Boolean(groupId) &&
      Boolean(serviceId) &&
      Boolean(username) &&
      (orgId !== prevProps.orgId ||
        groupId !== prevProps.groupId ||
        serviceId !== prevProps.serviceId ||
        username !== prevProps.username)
    ) {
      const freeCallSignerAddress = await getFreeCallSignerAddress(orgId, groupId, serviceId, username);
      changeServiceDetailsLeaf("freeCallSignerAddress", freeCallSignerAddress);
    }
  };

  setInvalidFields = invalidFields => {
    this.setState({ invalidFields });
  };

  render() {
    const { classes, changeGroups, serviceDetails, changeProtoFiles, setServiceDetailsInRedux } = this.props;
    return (
      <Grid container className={classes.pricingContainer}>
        <Grid item sx={12} sm={12} md={12} lg={12} className={classes.box}>
          <Typography variant="h6">Pricing distribution</Typography>
          <div className={classes.wrapper}>
            <Typography className={classes.description}>
              Groups provide a mechanism of having multiple instances of a service in a geographically distributed
              manner. All service metadata can be managed at a group level. At this point we only support a single group
              per service. Support for multiple groups per Service is coming soon.
            </Typography>
            <Region
              changeGroups={changeGroups}
              serviceGroups={serviceDetails.groups}
              invalidFields={this.state.invalidFields}
            />
            <UploadProto
              changeProtoFiles={changeProtoFiles}
              protoFilesUrl={serviceDetails.assets.protoFiles.url}
              invalidFields={this.state.invalidFields}
            />
            <AdvancedFields freeCallSignerAddress={serviceDetails.freeCallSignerAddress} />
            <div className={classes.alertContainer}>
              <AlertBox type={alert.ERROR} message={alert.message} />
            </div>
          </div>
        </Grid>
        <Actions
          serviceDetails={serviceDetails}
          setServiceDetailsInRedux={setServiceDetailsInRedux}
          setInvalidFields={this.setInvalidFields}
        />
      </Grid>
    );
  }
}
const mapStateToProps = state => ({
  orgId: state.organization.id,
  groupId: state.organization.groups[0].id,
  serviceId: state.aiServiceDetails.id,
  username: state.user.email,
});

const mapDispatchToProps = dispatch => ({
  getFreeCallSignerAddress: (orgId, groupId, serviceId, username) =>
    dispatch(aiServiceDetailsActions.getFreeCallSignerAddress(orgId, groupId, serviceId, username)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(PricingDistribution));
