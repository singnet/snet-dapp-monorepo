import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TermsAndConditionsDetails, TermsHTML, tncAgreementVesrion } from "./content";
import TermsAndConditions from "shared/dist/components/TermsAndConditions";
import { OnboardingRoutes } from "../OnboardingRouter/Routes";
import SNETButton from "shared/dist/components/SNETButton";
import { useStyles } from "./styles";
import { GlobalRoutes } from "../../../GlobalRouter/Routes";
import { loginActions } from "../../../Services/Redux/actionCreators/userActions";

const selectState = state => ({
  isInitialized: state.user.isInitialized,
  isLoggedIn: state.user.isLoggedIn,
  publisherTnC: state.user.publisherTnC,
});
const AcceptServiceAgreement = ({ history }) => {
  const classes = useStyles();
  const { isInitialized, isLoggedIn, publisherTnC } = useSelector(selectState);

  const [agreed, setAgreed] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isInitialized && !isLoggedIn) {
      history.push(GlobalRoutes.LOGIN.path);
    }
  }, [history, isInitialized, isLoggedIn]);

  useEffect(() => {
    if (publisherTnC.accepted) {
      history.push(OnboardingRoutes.SINGULARITY_ACCOUNT.path);
    }
  }, [history, isInitialized, isLoggedIn, publisherTnC.accepted]);

  const handleAccept = () => {
    dispatch(loginActions.updateUserTnCAttribute(tncAgreementVesrion));
    history.push(OnboardingRoutes.SINGULARITY_ACCOUNT.path);
  };

  return (
    <div>
      <TermsAndConditions
        title={TermsAndConditionsDetails.title}
        formLabel={TermsAndConditionsDetails.formLabel}
        agreed={agreed}
        onChangeAgreed={() => setAgreed(!agreed)}
        Content={TermsHTML}
      />
      <div className={classes.buttonsContainer}>
        <SNETButton color="primary" variant="contained" children="accept" onClick={handleAccept} disabled={!agreed} />
      </div>
    </div>
  );
};

export default AcceptServiceAgreement;
