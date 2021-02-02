import React from "react";
import { storiesOf } from "@storybook/react";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

import SNETList from "./";

storiesOf("SNETList", module)
  .addParameters({ props: { propTables: [SNETList] } })
  .addDecorator(withLiveEditScope({ React, SNETList }))
  .addLiveSource("live source", `return <SNETList display="hello"/>`);
