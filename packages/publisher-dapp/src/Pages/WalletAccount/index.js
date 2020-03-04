import React from "react";
import { useSelector } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";

import SNETPagination from "shared/dist/components/SNETPagination";
import SNETButton from "shared/dist/components/SNETButton";

import { itemsPerPageOptions } from "./content";
import { useStyles } from "./styles";
import { ControlServiceRequest } from "../../Utils/Daemon/Claims";
import { checkIfKnownError } from "shared/dist/utils/error";

const controlServiceRequest = new ControlServiceRequest("https://example-service-a.singularitynet.io:8088");
const WalletAccount = ({ classes }) => {
  const { limit, offset, totalCount } = useSelector(state => ({
    limit: state.aiServiceList.pagination.limit,
    offset: state.aiServiceList.pagination.offset,
    totalCount: state.aiServiceList.totalCount,
  }));

  const onItemsPerPageChange = () => {
    return null;
  };

  const handlePageChange = () => {
    return null;
  };

  const handleClick = async () => {
    try {
      await controlServiceRequest.getListUnclaimed();
    } catch (e) {
      if (checkIfKnownError(e)) {
        // TODO set alert error
      }
    }
  };

  return (
    <Grid container className={classes.walletAccContainer}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.topSection}>
        <Typography variant="h3">Wallet Account</Typography>
        <Typography variant="h5">
          Manage your token claims. Tokens can be claimed together or individually from each channel.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.box}>
        <div className={classes.pendingTokenSection}>
          <div className={classes.pendingTokenDetails}>
            <div>
              <InfoIcon />
              <Typography>Pending tokens</Typography>
            </div>
            <Typography className={classes.pendingValue}>
              123.065627 <span>agi</span>
            </Typography>
          </div>
          <SNETButton children="claims token" color="primary" variant="contained" />
          <Typography className={classes.tokenClaimDesc}>
            Lorem ipsum dolor sit amet, eu sit viris iracundia, graece molestiae sea ut. Quo in quas utamur
            conclusionemque, id vel solum quidam animal, mel nibh facete accusata ea.
          </Typography>
        </div>
        <div className={classes.expiringDetailsSection}>
          <div>
            <Typography>Claims expiring in 7 days</Typography>
            <Typography>21</Typography>
          </div>
          <div>
            <Typography>Value of claims expiring in 7 days</Typography>
            <Typography>
              232.7635 <span>agi</span>
            </Typography>
          </div>
          <div>
            <Typography>Escrow balance</Typography>
            <Typography>
              12338.06527 <span>agi</span>
            </Typography>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.box}>
        <div className={classes.header}>
          <Typography variant="h6">Claims</Typography>
        </div>
        <Typography className={classes.claimsDesc}>
          To collect pending tokens from individual channels, select the channels and use the claim button. Claims that
          are going to be expired soon are marked with “!” icon. Please note that you cannot select more than five
          claims at a time.
        </Typography>
        <div className={classes.claimSelectedSection}>
          <SNETButton children="click here to claim list" color="primary" variant="outlined" onClick={handleClick} />
          <Typography>Selected (0)</Typography>
        </div>
        <div className={classes.table}>
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.tableCol}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Typography>user</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2}>
              <Typography>total cliams</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Typography>expiry</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2}>
              <Typography>pending claims</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.tableRow}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <FormControlLabel control={<Checkbox color="primary" />} label="User Identifier 1" />
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2}>
              <Typography>201.56 AGI</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <WarningIcon className={classes.warningIcon} />
              <Typography>Nov 28, 2019</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2}>
              <Typography>26.78 AGI</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.styledPagination}>
            <SNETPagination
              itemsPerPageOptions={itemsPerPageOptions}
              itemsPerPage={limit}
              onItemsPerPageChange={onItemsPerPageChange}
              limit={limit}
              offset={offset}
              totalCount={totalCount}
              onPageChange={handlePageChange}
            />
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(WalletAccount);
