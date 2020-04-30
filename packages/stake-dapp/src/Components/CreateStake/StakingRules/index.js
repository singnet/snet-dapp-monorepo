import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";

const StakingRules = ({ classes }) => {
  return (
    <div className={classes.stakingRulesContainer}>
      <div className={classes.header}>
        <Typography>Staking Rules</Typography>
      </div>
      <div className={classes.stakingData}>
        <ul>
          <li>
            <Typography>
              <span>[1] - </span>Minimum stake of 500 AGI is required
            </Typography>
          </li>
          <li>
            <Typography>
              <span>[2] - </span>SNET foundation will accept all or a partial amount of your stake.
            </Typography>
          </li>
          <li>
            <Typography>
              <span>[3] - </span>Rejected stake portions not accepted will be returned to your wallet account
              automatically (no transaction fee will occur in this case).
            </Typography>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(StakingRules);
