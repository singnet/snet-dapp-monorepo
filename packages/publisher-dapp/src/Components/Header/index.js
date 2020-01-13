import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import SNETHeader from "shared/dist/components/SNETHeader";
import { GlobalRoutes } from "../../GlobalRouter/Routes";

const Header = () => {
  const history = useHistory();
  const { isLoggedIn } = useSelector(state => state.user);

  const headerProps = {    
    isLoggedIn,
    portalName: "Publisher",
    color: "white",
    navbar: {
      navbarItems: [
        { label: "Overview", type: "link", openInNewTab: false, activeLinks: ["/", "/overview"], to: "/overview" },
        { label: "How It Works", type: "link", openInNewTab: false, activeLinks: ["/enroll"], to: "/enroll" },
      ],
    },
    actions: [
      {
        children: "login",
        color: "primary",
        onClick: () => history.push(GlobalRoutes.LOGIN.path),
      },
      {
        children: "Get Started",
        color: "primary",
        onClick: () => history.push(GlobalRoutes.ENROLL.path),
        variant: "contained",
      },
    ],
  };

  return <SNETHeader {...headerProps} />;
};

export default Header;
