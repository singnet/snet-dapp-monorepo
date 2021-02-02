import React from "react";
import { storiesOf } from "@storybook/react";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

import AnchorLink from "./";

storiesOf("AnchorLink", module)
  .addParameters({ props: { propTables: [AnchorLink] } })
  .addDecorator(withLiveEditScope({ React, AnchorLink }))
  .addLiveSource("live source", `return <AnchorLink label ="anchor"  href="https://www.google.com" newTab= "false" />`);
