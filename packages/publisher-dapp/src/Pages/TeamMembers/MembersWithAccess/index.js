import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import SNETPagination from "shared/dist/components/SNETPagination";
import UserCard from "shared/dist/components/UserCard";
import { useStyles } from "./styles";
import { parseDateFromAPIResponse } from "shared/dist/utils/Date";

const MembersWithAccess = ({ classes, publisedMembers, publishedInProgressMembers }) => {
  const membersWithAccess = [...publisedMembers, ...publishedInProgressMembers];
  return (
    <Grid container className={classes.membersWithAccessContainer}>
      <Typography variant="h6">Team Members With Access</Typography>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.tableHead}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <span>member</span>
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2}>
          <span>role</span>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <span>joined since</span>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} />
      </Grid>
      {membersWithAccess.length === 0 ? (
        <span className={classes.message}>No team members added</span>
      ) : (
        membersWithAccess.map(item => (
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.tableBody} key={item.username}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <span className={classes.mobileTableHeader}>member</span>
              <UserCard userName={item.username} userEmail={item.username} />
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2}>
              <span className={classes.mobileTableHeader}>role</span>
              <div className={classes.infoIconContainer}>
                <span className={classes.tableBodyCell}>{item.role}</span>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <span className={classes.mobileTableHeader}>joined since</span>
              <span className={classes.tableBodyCell}>{parseDateFromAPIResponse(item.updated_on)}</span>
            </Grid>
          </Grid>
        ))
      )}
      {membersWithAccess.length > 4 ? (
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.paginationContainer}>
          <SNETPagination limit="4" offset="1" totalCount="100" />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default withStyles(useStyles)(MembersWithAccess);
