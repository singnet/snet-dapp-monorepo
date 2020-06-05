import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";

import { useStyles } from "./styles";
import SearchInputToggler from "./SearchInputToggler";
import ServiceSortOptions from "./ServiceSortOptions";

const ToolBar = () => {
  const classes = useStyles();
  const [showSearchInput, toggleSearchInput] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = event => {
    const { value } = event.target;
    setSearchKeyword(value);
  };

  return (
    <Grid container className={classes.toolBar}>
      <Grid item xs={6} sm={6} md={6} lg={6} className={classes.sortBySection}>
        <ServiceSortOptions />
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={6} className={classes.iconsContainer}>
        <span className={classes.servicesCount}>25 services</span>
        <button className={classes.searchBar}>
          <SearchInputToggler
            showSearchInput={showSearchInput}
            toggleSearchInput={toggleSearchInput}
            handleSearch={handleSearch}
            searchKeyword={searchKeyword}
          />
        </button>
      </Grid>
    </Grid>
  );
};

export default ToolBar;
