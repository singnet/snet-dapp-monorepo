import React from "react";
import Grid from "@material-ui/core/Grid";

import SNETFooter from "shared/dist/components/SNETFooter";
import VerticalTabs from "shared/dist/components/VerticalTabs";
import { upperTabs, lowerTabs } from "./dashboardMenuContent";
import Header from "../Components/Header";
import { FooterData } from "./footerContent";

const withDashboardMenu = Component => {
  return props => (
    <div>
      <Header />
      <Grid container>
        <Grid item xs={12} sm={2} md={2} lg={2}>
          <VerticalTabs upperTabs={upperTabs} lowerTabs={lowerTabs} />
        </Grid>
        <Grid item xs={12} sm={10} md={10} lg={10}>
          <Component {...props} />
        </Grid>
      </Grid>
      <SNETFooter data={FooterData} />
    </div>
  );
};

export default withDashboardMenu;
