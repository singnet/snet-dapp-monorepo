import React from "react";
import { useDropzone } from "react-dropzone";
import CloudUpload from "@material-ui/icons/Backup";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";
import FileStats from "./FileStats";

const SNETFileUpload = props => {
  const {
    disabled,
    minSize,
    maxSize,
    multiple,
    accept,
    onDrop,
    onDropAccepted,
    onDropRejected,
    showFileDetails,
    fileName,
    fileSize,
    fileDownloadURL,
    uploadSuccess,
    error,
  } = props;
  const classes = useStyles();

  // eslint-disable-next-line no-unused-vars
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    disabled,
    minSize,
    maxSize,
    multiple,
    accept,
    onDrop,
    onDropAccepted,
    onDropRejected,
  });

  return (
    <Grid container>
      <input {...getInputProps()} />
      <Grid item xs={12} sm={12} md={6} lg={6} className={classes.grayBox} {...getRootProps()}>
        <CloudUpload />
        <Typography>
          Drag and drop image here or<span> click</span>
        </Typography>
        <Typography>(Package must be under {maxSize}mb. Make sure the extension is .zip or .tar)</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <FileStats
          show={showFileDetails}
          fileName={fileName}
          fileSize={fileSize}
          fileDownloadURL={fileDownloadURL}
          uploadSuccess={uploadSuccess}
          error={error}
        />
      </Grid>
    </Grid>
  );
};

SNETFileUpload.prototypes = {
  disabled: PropTypes.disabled,
  onFileSelect: PropTypes.func,
  minSize: PropTypes.number,
  maxSize: PropTypes.number,
  multiple: PropTypes.bool,
  accept: PropTypes.oneOfType([PropTypes.string, PropTypes.array]), //https://github.com/react-dropzone/attr-accept
  onDrop: PropTypes.func,
  onDropAccepted: PropTypes.func,
  onDropRejected: PropTypes.func,
  showFileDetails: PropTypes.bool,
  fileName: PropTypes.string,
  fileSize: PropTypes.number,
  fileDownloadURL: PropTypes.string,
  uploadSuccess: PropTypes.bool,
};

export default SNETFileUpload;
