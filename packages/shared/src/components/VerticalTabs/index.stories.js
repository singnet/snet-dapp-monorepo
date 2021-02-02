import React from "react";
import { storiesOf } from "@storybook/react";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

import VerticalTabs from "./";

const upperTabs = [
  {
    title: "My AI Apps",
    openInNewTab: false,
  },
  {
    title: "Teams & Access",
    openInNewTab: false,
  },
];

const lowerTabs = [
  {
    title: "Wallet Account",
    openInNewTab: false,
  },
  {
    title: "Dev Docs",
    openInNewTab: true,
  },
];

storiesOf("VerticalTabs", module)
  .addParameters({ props: { propTables: [VerticalTabs] } })
  .addDecorator(withLiveEditScope({ React, VerticalTabs, upperTabs, lowerTabs }))
  .addLiveSource("live source", `return <VerticalTabs  upperTabs={upperTabs} lowerTabs={lowerTabs}/>`);
