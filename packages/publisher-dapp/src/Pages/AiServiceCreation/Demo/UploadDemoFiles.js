import React, { useCallback, useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import SNETFileUpload from "shared/dist/components/SNETFileUpload";
import isEmpty from "lodash/isEmpty";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import { aiServiceDetailsActions } from "../../../Services/Redux/actionCreators";
import { assetTypes } from "../../../Utils/FileUpload";
import { useDispatch } from "react-redux";
import JSZip from "jszip";
import ValidationError from "shared/dist/utils/validationError";

const UploadDemoFiles = ({ classes, orgUuid, serviceUuid, demoFilesUrl, changeDemoFiles, error }) => {
  const [alert, setAlert] = useState({});
  const [selectedFile, setSelectedFile] = useState({ name: "", size: "", type: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) setAlert({ type: alertTypes.ERROR, message: "Please upload Demo Files" });
  }, [error]);

  const handleFileDrop = useCallback(
    async (acceptedFiles, rejectedFiles) => {
      setAlert({});
      if (!isEmpty(rejectedFiles)) {
        return setAlert({ type: alertTypes.ERROR, message: "File rejected please check the maxSize and type of file" });
      }
      if (!isEmpty(acceptedFiles)) {
        try {
          const fileBlob = acceptedFiles[0];
          await validateIndexFile(fileBlob);
          const { name, size, type } = fileBlob;
          setSelectedFile({ name, size, type });

          const { url } = await dispatch(
            aiServiceDetailsActions.uploadFile(assetTypes.SERVICE_PAGE_COMPONENTS, fileBlob, orgUuid, serviceUuid)
          );
          changeDemoFiles(url);
          dispatch(aiServiceDetailsActions.setServiceTouchedFlag(true));
          return setAlert({ type: alertTypes.SUCCESS, message: "File accepted" });
        } catch (error) {
          setAlert({ type: alertTypes.ERROR, message: "Unable to upload due to missing index.js file" });
        }
      }
    },
    [changeDemoFiles, dispatch, orgUuid, serviceUuid]
  );
  const validateIndexFile = uploadedFile => {
    const fileToBePresent = "index.js";
    return new Promise((resolve, reject) => {
      const zip = new JSZip();
      zip.loadAsync(uploadedFile).then(entry => {
        const indexFileFound = Object.values(entry.files).some(file => {
          return file.name === fileToBePresent;
        });
        if (!indexFileFound) {
          reject(new ValidationError("The zip file should contain index.js file"));
        }
        resolve();
      });
    });
  };

  const acceptedFileTypes = ["application/zip", "application/x-zip-compressed"];

  return (
    <div className={classes.stepThreeContainer}>
      <Typography variant="subtitle1" className={classes.stepsHeading}>
        Step 3: Upload the Demo Files
      </Typography>
      <Typography variant="subtitle2">Zip / Rar / compress all the project files and drop it here. </Typography>
      <SNETFileUpload
        onDrop={handleFileDrop}
        accept={acceptedFileTypes}
        multiple={false}
        showFileDetails
        fileName={selectedFile.name}
        fileSize={selectedFile.size}
        fileDownloadURL={demoFilesUrl}
        uploadSuccess={Boolean(demoFilesUrl)}
        error={error}
      />
      <AlertBox type={alert.type} message={alert.message} />
    </div>
  );
};

export default UploadDemoFiles;
