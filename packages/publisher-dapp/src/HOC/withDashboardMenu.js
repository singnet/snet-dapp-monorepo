import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";

import HomeIcon from "@material-ui/icons/Home";
import GroupIcon from "@material-ui/icons/Group";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import DescriptionIcon from "@material-ui/icons/Description";
import SettingIcon from "@material-ui/icons/Settings";

import SNETFooter from "shared/dist/components/SNETFooter";
import VerticalTabs from "shared/dist/components/VerticalTabs";
import Header from "../Components/Header";
import { FooterData } from "./footerContent";
import { GlobalRoutes } from "../GlobalRouter/Routes";

import { useStyles } from "./styles";

const selectState = state => ({ orgUuid: state.organization.uuid });

const withDashboardMenu = Component => {
  const ComponentWithDashboardMenu = props => {
    const { orgUuid } = useSelector(selectState);

    const upperTabs = [
      {
        icon: <HomeIcon />,
        title: "My AI Apps",
        href: GlobalRoutes.SERVICES.path.replace(":orgUuid", orgUuid),
        openInNewTab: false,
      },
      {
        icon: <GroupIcon />,
        title: "Teams & Access",
        href: GlobalRoutes.INVITE_MEMBERS.path.replace(":orgUuid", orgUuid),
        openInNewTab: false,
      },
      /*{
        icon: <ShowChartIcon />,
        title: "App Analytics",
      },
      {
        icon: <AttachMoneyIcon />,
        title: "Sales & Trends",
      },
      {
        icon: <DashboardIcon />,
        title: "Financial Reports",
      },*/
    ];

    const lowerTabs = [
      {
        icon: <AccountBalanceIcon />,
        title: "Wallet Account",
        href: GlobalRoutes.WALLET_ACCOUNT.path,
        openInNewTab: false,
      },
      {
        icon: <DescriptionIcon />,
        title: "Dev Docs",
        href: "https://dev.singularitynet.io",
        openInNewTab: true,
      },
      {
        icon: <SettingIcon />,
        title: "Settings",
        href: GlobalRoutes.USER_PROFILE.path,
        openInNewTab: false,
      },
    ];

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
      <div>
        <Header showNotification={showUpdateNotification} onCloseClick={onUpdateCloseClick} ispageScrolled={scrolled} />
        <Grid container spacing={24}>
          <Grid
            item
            xs={2}
            sm={2}
            md={2}
            lg={2}
            className={showUpdateNotification ? classes.addMarginTopToVerticalTab : null}
          >
            <VerticalTabs upperTabs={upperTabs} lowerTabs={lowerTabs} />
          </Grid>
          <Grid item xs={2} sm={10} md={10} lg={10} className={showUpdateNotification ? classes.addMarginTop : null}>
            <Component {...props} />
          </Grid>
        </Grid>
        <SNETFooter data={FooterData} />
      </div>
    );
  };

  return ComponentWithDashboardMenu;
};

export default withDashboardMenu;
