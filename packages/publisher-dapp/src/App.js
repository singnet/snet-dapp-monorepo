import React from "react";
import { Provider as ReactReduxProvider } from "react-redux";
import { ThemeProvider as MUIThemeProvider } from "@material-ui/core/styles";
import Amplify from "aws-amplify";

import GlobalRouter from "./GlobalRouter";
import configureStore from "./Services/Redux/Store";
import { MUITheme } from "./Assets/MUITheme";
import DefaultHelmet from "./Services/Helmet";
import { aws_config } from "./Services/AWS/aws_config";
import GlobalLoader from "./Components/GlobalLoader";
import initQuantcast from "shared/dist/scripts/quantcast";

const store = configureStore();

Amplify.configure(aws_config);

initQuantcast();

function App() {
  return (
    <ReactReduxProvider store={store}>
      <MUIThemeProvider theme={MUITheme}>
        <DefaultHelmet />
        <GlobalRouter />
        <GlobalLoader />
      </MUIThemeProvider>
    </ReactReduxProvider>
  );
}

export default App;
