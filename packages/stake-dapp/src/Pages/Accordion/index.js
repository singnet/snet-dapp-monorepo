import React, { useState } from "react";
import ParseHTML from "html-react-parser";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { useStyles } from "./styles";

const FAQAccordion = ({ classes, data }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.accordionContainer}>
      {data.map((item, index) => (
        <ExpansionPanel
          expanded={expanded === index}
          onChange={handleChange(index)}
          className={classes.expansionPanel}
          key={index}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.panelSummary}>
            <Typography className={classes.question}>{item.question}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography className={classes.answer}>{ParseHTML(item.answer)}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
};

export default withStyles(useStyles)(FAQAccordion);
