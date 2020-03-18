import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ShowMoreIcon from "@material-ui/icons/MoreVert";

import UserCard from "shared/dist/components/UserCard";
import SNETButton from "shared/dist/components/SNETButton";

import { useStyles } from "./styles";
import AlertBox from "shared/dist/components/AlertBox";

const AcceptedMembers = ({
  classes,
  acceptedMembers,
  handleAddToBlockChain,
  addBlockChainAlert,
  shouldAddToBlockChainBeEnabled,
}) => {
  return (
    <Grid container className={classes.acceptedMembersContainer}>
      <Typography variant="h6">
        Accepted Invitations {acceptedMembers.length > 0 ? acceptedMembers.length : null}
      </Typography>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.column}>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <span>joining member</span>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <span>role</span>
        </Grid>
      </Grid>
      <div className={classes.tableBody}>
        {acceptedMembers.length === 0 ? (
          <span className={classes.message}>No pending accepted invitations</span>
        ) : (
          acceptedMembers.map(item => (
            <Grid item sx={12} sm={12} md={12} lg={12} className={classes.data} key={item.email}>
              <Grid item sx={12} sm={12} md={8} lg={8}>
                <span className={classes.mobileTableHeader}>joining member:</span>
                <UserCard userName={item.username} userEmail={item.username} />
              </Grid>
              <Grid item sx={12} sm={12} md={4} lg={4}>
                <span className={classes.mobileTableHeader}>role:</span>
                <span className={classes.tableBodyCell}>{item.role}</span>
              </Grid>
              <ShowMoreIcon className={classes.showMoreIcon} />
            </Grid>
          ))
        )}
      </div>
      <AlertBox type={addBlockChainAlert.type} message={addBlockChainAlert.message} />
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.btnContainer}>
        <SNETButton
          children="add to blockchain"
          variant="contained"
          color="primary"
          onClick={handleAddToBlockChain}
          disabled={!shouldAddToBlockChainBeEnabled()}
        />
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(AcceptedMembers);
