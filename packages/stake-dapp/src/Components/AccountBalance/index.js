import React from "react";
import { useSelector } from "react-redux";

import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";
import MetaMaskAccountBalance from "./MetaMaskAccountBalance";

const AccountBalance = ({ classes }) => {
  const { metamaskDetails } = useSelector(state => state.metamaskReducer);

  return (
    <div className={classes.accountBalanceContainer}>
      <h3>Account Balance</h3>
      {metamaskDetails.isTxnsAllowed ? (
        <MetaMaskAccountBalance description />
      ) : (
        <div>
          <div className={classes.warningBox}>
            <span>You need Metamask wallet to create stake.</span>
            <Typography>
              Please <a href="#">Login</a> or <a href="#">Install </a> to your Metamask wallet account and connect to
              SingularityNet.{" "}
            </Typography>
            <Typography>
              <a href="https://metamask.io/" target="_new">
                Click here{" "}
              </a>
              to install and learn more about how to use Metamask and your AGI credits with SingularityNet AI
              Marketplace.
            </Typography>
          </div>
          {/* Commented the button as per the UI flow suggestion*/}
          {/* {!isTxnsAllowed ? (
            <div className={classes.btnContainer}>
              <StyledButton type="blue" btnText="connect metamask" />
            </div>
          ) : null} */}
        </div>
      )}
    </div>
  );
};

export default withStyles(useStyles)(AccountBalance);
