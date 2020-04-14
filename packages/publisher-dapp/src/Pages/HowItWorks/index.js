import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import ArtboardImg from "shared/dist/assets/images/Artboard.png";
import SNETButton from "shared/dist/components/SNETButton";

import { relatedContentData, howItWorksContent } from "./content";
import { GlobalRoutes } from "../../GlobalRouter/Routes";
import Working from "./Working";
import RelatedContent from "./RelatedContent";
import { useStyles } from "./styles";

const selectState = state => ({
  isLoggedIn: state.user.isLoggedIn,
  orgUuid: state.organization.uuid,
  publisherTnC: state.user.publisherTnC,
});

const HowItWorks = ({ classes, history }) => {
  const { isLoggedIn, orgUuid, publisherTnC } = useSelector(selectState);

  useEffect(() => {
    if (isLoggedIn && (orgUuid || publisherTnC.accepted)) {
      history.push(GlobalRoutes.ONBOARDING.path);
    }
  }, [history, isLoggedIn, orgUuid, publisherTnC]);

  const handleGetStarted = () => {
    history.push(GlobalRoutes.ENROLL.path);
  };

  return (
    <Grid container className={classes.howItWorksContainer}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.topSection}>
        <Grid item xs={12} sm={12} md={6} lg={5} className={classes.topSectionContent}>
          <Typography variant="h2">A Comprehensive AI Publishing Infrastructure</Typography>
          <Typography className={classes.description}>
            <span>
              Publishing AI services even in today’s online world is not an easy task, offering little in the way of
              analyses tools to calibrate your services toward what your customers really want.
            </span>
            <span>
              Our publishing infrastructure provides both a central hub for creating, editing, and managing your AI
              services and the tools to launch those services to a global market.
            </span>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={7} className={classes.topSectionMedia}>
          <img src={ArtboardImg} alt="Art Board" />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.workingContainer}>
        <Typography variant="h2">How it works?</Typography>
        {howItWorksContent.map((item, index) => (
          <Working
            icon={item.icon}
            title={item.title}
            description={item.description}
            btnTitle={item.btnTitle}
            linkTo={item.linkTo}
            rightAlign={(index + 1) % 2 === 0}
            key={item.title}
          />
        ))}
        <SNETButton children="get started" color="primary" variant="contained" onClick={handleGetStarted} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.relatedContentContainer}>
        <Typography variant="h2">Related content you might like</Typography>
        <div className={classes.cardGroup}>
          {relatedContentData.map(item => (
            <RelatedContent
              key={item.cardTitle}
              cardTitle={item.cardTitle}
              cardMedia={item.cardMedia}
              cardDescription={item.cardDescription}
              cardAction={item.cardAction}
              cardLinkTo={item.cardLinkTo}
            />
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(HowItWorks);
