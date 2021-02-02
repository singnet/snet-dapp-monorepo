import React, { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ReactGA from "react-ga";

import SNETButton from "shared/dist/components/SNETButton";
import { GlobalRoutes } from "../../GlobalRouter/Routes";
import { GAEventsContent } from "../../Utils/GAEvents";

const LoggedOutActions = () => {
  const history = useHistory();
  const location = useLocation();

  const continueButtonDetails = () => {
    if (location.pathname === GlobalRoutes.ENROLL.path) {
      return {
        children: "continue",
        onClick: () => {
          ReactGA.event(GAEventsContent.HEADER_CONTINUE);
          history.push(GlobalRoutes.SIGNUP.path);
        },
      };
    }
    return {
      children: "get started",
      onClick: () => {
        ReactGA.event(GAEventsContent.GET_STARTED_HEADER);
        history.push(GlobalRoutes.ENROLL.path);
      },
    };
  };

  return (
    <Fragment>
      <SNETButton children="login" color="primary" onClick={() => history.push(GlobalRoutes.LOGIN.path)} />
      <SNETButton color="primary" variant="contained" {...continueButtonDetails()} />
    </Fragment>
  );
};

export default LoggedOutActions;
