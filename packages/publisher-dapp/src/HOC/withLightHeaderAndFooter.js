import React, { Fragment, useState, useEffect } from "react";
import SNETFooter from "shared/dist/components/SNETFooter";

import { FooterData } from "./footerContent";
import Header from "../Components/Header";
import Box from "@material-ui/core/Box";
import { useStyles } from "./styles";

const withLightHeaderAndFooter = Component => {
  return props => {
    const classes = useStyles();
    const [showUpdateNotification, setShowUpdateNotificationBar] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    const onUpdateCloseClick = () => {
      setShowUpdateNotificationBar(false);
    };

    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    return (
      <Fragment>
        <Header showNotification={showUpdateNotification} onCloseClick={onUpdateCloseClick} ispageScrolled={scrolled} />
        <Box mt={8} className={showUpdateNotification ? classes.increaseTopSpace : null}>
          <Component {...props} />
        </Box>
        <SNETFooter data={FooterData} />
      </Fragment>
    );
  };
};

export default withLightHeaderAndFooter;
