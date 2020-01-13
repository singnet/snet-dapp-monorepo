import React, { Fragment } from "react";
import SNETFooter from "shared/dist/components/SNETFooter";

import Header from "../Components/Header";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

const withLightHeaderAndFooter = Component => {
  return props => (
    <Fragment>
      <Header />
      <Container>
        <Box my={8}>
          <Component {...props} />
        </Box>
      </Container>
      <SNETFooter />
    </Fragment>
  );
};

export default withLightHeaderAndFooter;
