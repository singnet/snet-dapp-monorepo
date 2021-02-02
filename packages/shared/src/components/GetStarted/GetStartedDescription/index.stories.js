import React from "react";
import { storiesOf } from "@storybook/react";
import GetStartedDescription from "./";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

storiesOf("GetStartedDescription", module)
  .addParameters({ props: { propTables: [GetStartedDescription] } })
  .addDecorator(withLiveEditScope({ React, GetStartedDescription }))
  .addLiveSource(
    "live source",
    `return <GetStartedDescription title="GetStartedDescription" description ="describe GetStartedDescription" />`
  );
