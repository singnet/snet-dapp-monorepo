import React from "react";
import { storiesOf } from "@storybook/react";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";
import SNETHeader from "./";

storiesOf("SNETHeader", module)
  .addParameters({ props: { propTables: [SNETHeader] } })
  .addDecorator(withLiveEditScope({ React, SNETHeader }))
  .addLiveSource(
    "live source",
    `return <SNETHeader 
      isLoggedIn="true"
    onLogoClick={console.log}
    LoggedInActions={console.log}
    LoggedOutActions={console.log}
    />`
  );
