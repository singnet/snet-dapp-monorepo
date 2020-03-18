import React from "react";
import { useSelector } from "react-redux";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import SNETTextfield from "shared/dist/components/SNETTextfield";

import { useStyles } from "./styles";
import MMAddress from "./MMAddress";

const TechnicalInfo = ({ classes }) => {
  const { groups } = useSelector(state => state.organization);
  return (
    <div className={classes.technicalInfoContainer}>
      <Typography variant="subtitle1">Technical Information</Typography>
      <MMAddress classes={classes} />
      {groups.map(group => (
        <div key={group.id} className={classes.groupInfoContainer}>
          <SNETTextfield
            disabled
            label="Payment Address"
            description="The Metamask address to which all the payments will be transferred "
            name="paymentaddress"
            value={group.paymentAddress}
          />
          {group.paymentConfig.paymentChannelStorageClient.endpoints.map(endpoint => (
            <SNETTextfield
              disabled
              label="ETCD Endpoint"
              description=" ETCD end points that will be used for this organization."
              name="etcdendpoints"
              value={endpoint}
              key={endpoint}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default withStyles(useStyles)(TechnicalInfo);
