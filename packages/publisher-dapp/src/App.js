import React from "react";
import { Provider as ReactReduxProvider } from "react-redux";
import { ThemeProvider as MUIThemeProvider } from "@material-ui/core/styles";
import Amplify from "aws-amplify";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";

import GlobalRouter from "./GlobalRouter";
import store from "./Services/Redux/Store";
import { MUITheme } from "./Assets/MUITheme";
import DefaultHelmet from "./Services/Helmet";
import { aws_config } from "./Services/AWS/aws_config";
import GlobalLoader from "./Components/GlobalLoader";
import initQuantcast from "shared/dist/scripts/quantcast";
import initHotjar from "shared/dist/scripts/hotjar";
import UserFeedbackSlack from "./Components/UserFeedbackSlack";

Amplify.configure(aws_config);

initQuantcast();

const history = createBrowserHistory();

if (process.env.REACT_APP_GA_TRACKING_ID) {
  ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
  history.listen(location => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });
}

if (process.env.REACT_APP_HOTJAR_ID && process.env.REACT_APP_HOTJAR_SV) {
  initHotjar(process.env.REACT_APP_HOTJAR_ID, process.env.REACT_APP_HOTJAR_SV);
}

function App() {
  return (
    <ReactReduxProvider store={store}>
      <MUIThemeProvider theme={MUITheme}>
        <DefaultHelmet />
        <GlobalRouter />
        <GlobalLoader />
        <UserFeedbackSlack />
      </MUIThemeProvider>
    </ReactReduxProvider>
  );
}

export default App;
