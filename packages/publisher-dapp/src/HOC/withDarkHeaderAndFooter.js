import React, { Fragment } from "react";
import Footer from "shared/dist/components/Footer";

const withDarkHeaderAndFooter = ({ children }) => {
  return (
    <Fragment>
      <header>Dark Header</header>
      {children}
      <Footer />
    </Fragment>
  );
};

export default withDarkHeaderAndFooter;
