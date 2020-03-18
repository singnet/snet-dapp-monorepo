import React from "react";
import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import SNETTextarea from "shared/dist/components/SNETTextarea";
import SNETButton from "shared/dist/components/SNETButton";
import { useStyles } from "./styles";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";

const InvitePopup = ({
  classes,
  open,
  handleClose,
  textareaValue,
  onTextareaChange,
  handleSendInvitation,
  inviteMembersAlert,
}) => {
  return (
    <Modal open={open} onClose={handleClose} className={classes.inviteModal}>
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          title={<Typography variant="h4">Invite Team Members</Typography>}
          action={
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent className={classes.popupContent}>
          <SNETTextarea
            label="Email Address(es)"
            extraInfo="For multiple emails, separated by comma"
            rowCount="6"
            value={textareaValue}
            onChange={onTextareaChange}
          />
        </CardContent>
        {inviteMembersAlert.type === alertTypes.ERROR ? (
          <div className={classes.alertContainer}>
            <AlertBox type={inviteMembersAlert.type} message={inviteMembersAlert.message} />
          </div>
        ) : null}
        <CardActions className={classes.btnContainer}>
          <SNETButton children="cancel" color="primary" variant="text" onClick={handleClose} />
          <SNETButton
            children="send invitation(s)"
            color="primary"
            variant="contained"
            onClick={handleSendInvitation}
          />
        </CardActions>
      </Card>
    </Modal>
  );
};

export default withStyles(useStyles)(InvitePopup);
