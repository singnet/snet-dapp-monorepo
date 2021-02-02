import React from "react";
import { storiesOf } from "@storybook/react";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

import SNETAppBar from "./";

storiesOf("SNETAppBar", module)
  .addParameters({ props: { propTables: [SNETAppBar] } })
  .addDecorator(withLiveEditScope({ React, SNETAppBar }))
  .addLiveSource("live source", `return <SNETAppBar color="white" />`);
