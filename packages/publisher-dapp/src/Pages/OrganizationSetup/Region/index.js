import React, { Fragment, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { useStyles } from "./styles";
import SNETButton from "shared/dist/components/SNETButton";
import { OrganizationSetupRoutes } from "../OrganizationSetupRouter/Routes";
import Settings from "./Settings";
import { useSelector } from "react-redux";
import validator from "shared/dist/utils/validator";
import { orgSetupRegionValidationConstraints } from "./validationConstraints";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import { generateDetailedErrorMessageFromValidation } from "../../../Utils/validation";

const Region = ({ history, classes, handleFinishLater }) => {
  const [alert, setAlert] = useState({});
  const organization = useSelector(state => state.organization);
  const { groups } = organization;
  const [invalidFields, setInvalidFields] = useState();
  const [invalidFieldsFlag, setInvalidFieldsFlag] = useState();

  const handleContinue = () => {
    let invalidFields = validator(organization, orgSetupRegionValidationConstraints, { format: "grouped" });

    for (const property in invalidFields) {
      if (property === "groups") {
        const invalidProperty = JSON.parse(invalidFields[property]);
        Object.assign(invalidFields, invalidProperty[0]);
        delete invalidFields.groups;
      }
    }
    if (invalidFields) {
      const isNotValid = Object.values(invalidFields).map(key => key[0]);
      if (isNotValid) {
        for (let i = 0; i < isNotValid.length; i++) {
          if (isNotValid[i].includes(",")) {
            let res = isNotValid[i].split(",");
            isNotValid.splice(i, 1);
            isNotValid.push(...res);
          }
        }
        setInvalidFieldsFlag(true);
        setInvalidFields(invalidFields);
        const errorMessage = generateDetailedErrorMessageFromValidation(isNotValid);
        return setAlert({ type: alertTypes.ERROR, children: errorMessage });
      }
    }
    setInvalidFieldsFlag(false);
    history.push(OrganizationSetupRoutes.PUBLISH_TO_BLOCKCHAIN.path.replace(":orgUuid", organization.uuid));
  };

  const handleBack = () => {
    history.push(OrganizationSetupRoutes.ORGANIZATION_PROFILE.path.replace(":orgUuid", organization.uuid));
  };

  return (
    <Fragment>
      <div className={classes.box}>
        <Typography variant="h6">Regional Groups Configuration</Typography>
        <Typography variant="subtitle2">
          Every AI service your company publishes can be optimized for users based in various regions and groups. Groups
          provide a mechanism of having multiple instances of a service in a geographically distributed manner. Details
          &nbsp;
          <a
            href="http://dev.singularitynet.io/docs/ai-developers/organization-setup/"
            rel="noopener noreferrer"
            target="_blank"
          >
            here
          </a>
        </Typography>
        {groups.map((group, index) => (
          <Settings
            groups={groups}
            groupIndex={index}
            group={group}
            key={group.id}
            foundInBlockchain={organization.foundInBlockchain}
            invalidFields={typeof invalidFieldsFlag !== "undefined" && !!invalidFields ? invalidFields : {}}
          />
        ))}

        <div className={classes.alertContainer}>
          <AlertBox type={alert.type} message={alert.message} children={alert.children} />
        </div>
      </div>
      <div className={classes.buttonsContainer}>
        <SNETButton color="primary" children="finish later" onClick={handleFinishLater} />
        <SNETButton color="primary" children="back" onClick={handleBack} />
        <SNETButton color="primary" variant="contained" children="continue" onClick={handleContinue} />
      </div>
    </Fragment>
  );
};

export default withStyles(useStyles)(Region);
