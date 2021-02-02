import React from "react";
import { storiesOf } from "@storybook/react";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

import TermsAndConditions from "./";

storiesOf("TermsAndConditions", module)
  .addParameters({ props: { propTables: [TermsAndConditions] } })
  .addDecorator(withLiveEditScope({ React, TermsAndConditions }))
  .addLiveSource("live source", `return <TermsAndConditions  />`);
