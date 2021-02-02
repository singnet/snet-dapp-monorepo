import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { useStyles } from "./styles";
import StyledTextField from "shared/dist/components/StyledTextField";
import { hqAddressFormData } from "./content";
import { useSelector, useDispatch } from "react-redux";
import { organizationActions } from "../../../../../Services/Redux/actionCreators";

const HQAddress = ({ classes }) => {
  const { street, apartment, city, zip, country } = useSelector(state => state.organization.orgAddress.hqAddress);
  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.target;
    dispatch(organizationActions.setOrgHqAddressDetail(name, value));
  };

  return (
    <Grid item sx={12} sm={12} md={6} lg={6} className={classes.headquartersContainer}>
      <Typography variant="subtitle1">Registered Address</Typography>
      <StyledTextField
        {...hqAddressFormData.STREET}
        variant="outlined"
        value={street}
        onChange={handleChange}
        fullWidth
      />
      <StyledTextField
        {...hqAddressFormData.APARTMENT}
        variant="outlined"
        value={apartment}
        onChange={handleChange}
        fullWidth
      />
      <StyledTextField {...hqAddressFormData.CITY} variant="outlined" value={city} onChange={handleChange} fullWidth />
      <Grid container>
        <Grid item sx={12} sm={12} md={4} lg={4} className={classes.postalCode}>
          <StyledTextField
            {...hqAddressFormData.ZIP}
            variant="outlined"
            value={zip}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item sx={12} sm={12} md={8} lg={8}>
          <StyledTextField
            {...hqAddressFormData.COUNTRY}
            variant="outlined"
            value={country}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

HQAddress.propTypes = {
  hqAddress: PropTypes.shape({
    street: PropTypes.string,
    apartment: PropTypes.string,
    city: PropTypes.string,
    zip: PropTypes.string,
    country: PropTypes.string,
  }),
};

export default withStyles(useStyles)(HQAddress);
