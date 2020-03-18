import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ShowMoreIcon from "@material-ui/icons/MoreVert";

import InvitePopup from "./InvitePopup";
import SNETButton from "shared/dist/components/SNETButton";
import { useStyles } from "./styles";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import { parseDateFromAPIResponse } from "shared/dist/utils/Date";

const InvitedMembers = ({
  classes,
  showPopup,
  handleInviteMembersOpen,
  textareaValue,
  onTextareaChange,
  handleSendInvitation,
  pendingMembers,
  verifiedMembers,
  handleClose,
  inviteMembersAlert,
  shouldInviteMembersBeEnabled,
}) => {
  const invitedMembers = [...pendingMembers, ...verifiedMembers];
  return (
    <Grid container className={classes.invitedMembersContainer}>
      <Typography variant="h6">Invited {invitedMembers.length > 0 ? invitedMembers.length : null}</Typography>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.column}>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <span>email</span>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <span>invited on</span>
        </Grid>
      </Grid>
      <div className={classes.tableBody}>
        {invitedMembers.length === 0 ? (
          <span className={classes.message}>No pending invitations</span>
        ) : (
          invitedMembers.map(item => (
            <Grid item xs={12} sm={12} md={12} lg={12} className={classes.data} key={item.username}>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <span className={classes.mobileTableHeader}>email</span>
                <span className={classes.tableBodyCell}>{item.username}</span>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <span className={classes.mobileTableHeader}>invited on</span>
                <span className={classes.tableBodyCell}>{parseDateFromAPIResponse(item.invited_on)}</span>
              </Grid>
              <ShowMoreIcon className={classes.showMoreIcon} />
            </Grid>
          ))
        )}
      </div>
      {inviteMembersAlert.type === alertTypes.SUCCESS ? (
        <div className={classes.alertContainer}>
          <AlertBox type={inviteMembersAlert.type} message={inviteMembersAlert.message} />
        </div>
      ) : null}
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.btnContainer}>
        <SNETButton
          children="invite members"
          variant="contained"
          color="primary"
          onClick={handleInviteMembersOpen}
          disabled={!shouldInviteMembersBeEnabled()}
        />
      </Grid>
      <InvitePopup
        open={showPopup}
        textareaValue={textareaValue}
        onTextareaChange={onTextareaChange}
        handleSendInvitation={handleSendInvitation}
        handleClose={handleClose}
        inviteMembersAlert={inviteMembersAlert}
      />
    </Grid>
  );
};

export default withStyles(useStyles)(InvitedMembers);
