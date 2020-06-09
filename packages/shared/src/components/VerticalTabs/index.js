import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";

import ToggleMenu from "./ToggleMenu";
import { useStyles } from "./styles";

const VerticalTabs = ({ upperTabs, lowerTabs }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <ToggleMenu classes={classes} isOpen={open} setIsOpen={setOpen} />
        <List className={classes.list}>
          {upperTabs.map(item => (
            <Tooltip title={!open ? item.title : ""} key={item.title}>
              <ListItem button className={classes.listItem} onClick={item.onRowClick}>
                <a href={item.href} target={item.openInNewTab ? "_blank" : ""} rel="noreferrer noopener">
                  <ListItemIcon className={classes.listItemIcon}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </a>
              </ListItem>
            </Tooltip>
          ))}
        </List>
        <Divider />
        <List className={classes.list}>
          {lowerTabs.map(item => (
            <Tooltip title={!open ? item.title : ""} key={item.title}>
              <ListItem button className={classes.listItem} onClick={item.onRowClick}>
                <a href={item.href} target={item.openInNewTab ? "_blank" : ""} rel="noreferrer noopener">
                  <ListItemIcon className={classes.listItemIcon}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </a>
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

VerticalTabs.propTypes = {
  upperTabs: PropTypes.array,
  lowerTabs: PropTypes.array,
};

export default VerticalTabs;
