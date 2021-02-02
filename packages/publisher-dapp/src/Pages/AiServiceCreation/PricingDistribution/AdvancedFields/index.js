import React from "react";
import Typography from "@material-ui/core/Typography";
import MPENetworks from "singularitynet-platform-contracts/networks/MultiPartyEscrow";

import { useStyles } from "./styles";
import SNETTextfield from "shared/dist/components/SNETTextfield";

const AdvancedFields = ({ freeCallSignerAddress }) => {
  const classes = useStyles();
  return (
    <div className={classes.advFilesContainer}>
      <Typography variant="subtitle1">Advanced Fields</Typography>
      <Typography className={classes.description}>
        These fields are for refrence only and do not need to be changed
      </Typography>
      <SNETTextfield
        icon
        name="mpeAddress"
        value={MPENetworks[process.env.REACT_APP_ETH_NETWORK].address}
        label="MPE Address"
        description={
          <p>
            The ethereum address of the MultiParty Escrow contract on the Ethereum mainnet. Details &nbsp;
            <a href="https://dev.singularitynet.io/docs/ai-developers/mpe/" rel="noopener noreferrer" target="_blank">
              here
            </a>
          </p>
        }
        disabled
      />
      <SNETTextfield
        icon
        name="signer address"
        value={freeCallSignerAddress || ""}
        label="Free call signer address"
        description="This address is used to sign all calls made as part of the free trial"
        disabled
      />
    </div>
  );
};

export default AdvancedFields;
