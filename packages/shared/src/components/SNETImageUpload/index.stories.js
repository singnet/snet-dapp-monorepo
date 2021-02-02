import React from "react";
import { storiesOf } from "@storybook/react";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

import SNETImageUpload from "./";

storiesOf("SNETImageUpload", module)
  .addParameters({ props: { propTables: [SNETImageUpload] } })
  .addDecorator(withLiveEditScope({ React, SNETImageUpload }))
  .addLiveSource("live source", `return <SNETImageUpload  />`);
