import React, { useState } from "react";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import General from "shared/dist/assets/images/General.png";
import Metamask from "shared/dist/assets/images/Metamask.png";
// import Troubleshooting from "shared/dist/assets/images/Troubleshooting.png";
// import AutoRenewal from "shared/dist/assets/images/AutoRenewal.png";

import Accordion from "../Accordion";
import { communityDetails, generalFAQ, metamaskFAQ } from "./content";
import { useStyles } from "./styles";

const FAQ = ({ classes }) => {
  const [value, setValue] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
    setSelectedTab(newValue);
  };
  return (
    <div className={classes.faqContainer}>
      <Typography variant="h2">Frequently Asked Questions</Typography>
      <AppBar position="static" className={classes.appBar}>
        <Tabs
          className={classes.tabs}
          value={value}
          onChange={handleChange}
          variant="scrollable"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab
            className={classes.tab}
            label={
              <p>
                General <span>FAQ</span>
              </p>
            }
            icon={<img src={General} alt="General FAQ" />}
            value={0}
          />
          <Tab
            className={classes.tab}
            label={
              <p>
                Metamask <span>FAQ</span>
              </p>
            }
            icon={<img src={Metamask} alt="Metamask FAQ" />}
            value={1}
          />
          {/*<Tab
            className={classes.tab}
            label={
              <p>
                Troubleshooting <span>FAQ</span>
              </p>
            }
            icon={<img src={Troubleshooting} alt="Troubleshooting FAQ" />}
            value={2}
          />
          <Tab
            className={classes.tab}
            label={
              <p>
                Auto Renewal <span>FAQ</span>
              </p>
            }
            icon={<img src={AutoRenewal} alt="Auto Renewal FAQ" />}
            value={3}
          /> */}
        </Tabs>
      </AppBar>
      {selectedTab === 0 && (
        <div className={classes.accordionContainer}>
          <Accordion data={generalFAQ} />
        </div>
      )}
      {selectedTab === 1 && (
        <div className={classes.accordionContainer}>
          <Accordion data={metamaskFAQ} />
        </div>
      )}
      <div className={classes.learnAndShareContainer}>
        <Typography variant="h2">Learn and share in the community</Typography>
        <ul>
          {communityDetails.map(item => (
            <li key={item.title}>
              <a href={item.to} title={item.title} target="_blank" rel="noopener noreferrer">
                <img src={item.image} alt={item.title} />
                <Typography variant="h6">{item.title}</Typography>
                <Typography>{item.description}</Typography>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(FAQ);
