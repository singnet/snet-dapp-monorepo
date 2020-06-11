import React from "react";
import Grid from "@material-ui/core/Grid";

import PrimaryFooter from "./PrimaryFooter";
import SecondaryFooter from "./SecondaryFooter";
import { useStyles } from "./styles";

const Footer = ({ data }) => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Grid container className={classes.footerWrapper}>
        <PrimaryFooter leftData={data.PrimaryFooterLeft} mainData={data.PrimaryFooterMain} />
        <SecondaryFooter data={data.SecondaryFooter} />
      </Grid>
    </footer>
  );
};

export default Footer;
