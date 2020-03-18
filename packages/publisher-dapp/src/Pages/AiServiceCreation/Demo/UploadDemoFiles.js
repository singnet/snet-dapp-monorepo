import React, { useCallback, useState } from "react";
import Typography from "@material-ui/core/Typography";
import SNETFileUpload from "shared/dist/components/SNETFileUpload";
import isEmpty from "lodash/isEmpty";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import { aiServiceDetailsActions } from "../../../Services/Redux/actionCreators";
import { assetTypes } from "../../../Utils/FileUpload";
import { useDispatch } from "react-redux";

const UploadDemoFiles = ({ classes, orgUuid, serviceUuid, demoFilesUrl }) => {
  const [alert, setAlert] = useState({});
  const [selectedFile, setSelectedFile] = useState({ name: "", size: "", type: "" });
  const dispatch = useDispatch();

  const handleFileDrop = useCallback(
    async (acceptedFiles, rejectedFiles) => {
      setAlert({});
      if (!isEmpty(rejectedFiles)) {
        return setAlert({ type: alertTypes.ERROR, message: "File rejected please check the maxSize and type of file" });
      }
      if (!isEmpty(acceptedFiles)) {
        try {
          const fileBlob = acceptedFiles[0];
          const { name, size, type } = fileBlob;
          setSelectedFile({ name, size, type });

          const { url } = await dispatch(
            aiServiceDetailsActions.uploadFile(assetTypes.SERVICE_PAGE_COMPONENTS, fileBlob, orgUuid, serviceUuid)
          );
          dispatch(aiServiceDetailsActions.setServiceDemoFilesUrl(url));
          dispatch(aiServiceDetailsActions.setServiceTouchedFlag(true));
          return setAlert({ type: alertTypes.SUCCESS, message: "File accepted" });
        } catch (error) {
          setAlert({ type: alertTypes.ERROR, message: "Unable to upload file" });
        }
      }
    },
    [dispatch, orgUuid, serviceUuid]
  );

  const acceptedFileTypes = "application/zip";

  return (
    <div className={classes.stepThreeContainer}>
      <Typography variant="subtitle1" className={classes.stepsHeading}>
        Step 3: Upload the Demo Files
      </Typography>
      <Typography variant="subtitle2">
        Zip / Rar / compress all the project files and drop it here. Lorem ipsum dolor sit amet, eu nec aliquam volutpat
        partiendo, id idque mentitum assentior vis, nam no tamquam principes gloriatur. Omnes intellegam suscipiantur eu
        usu, vel tota senserit prodesset in. Nostrum probatus singulis id nec, virtute docendi mnesarchum pri ea, eirmod
        maiorum scripserit quo ei.{" "}
      </Typography>
      <SNETFileUpload
        onDrop={handleFileDrop}
        accept={acceptedFileTypes}
        multiple={false}
        showFileDetails
        fileName={selectedFile.name}
        fileSize={selectedFile.size}
        fileDownloadURL={demoFilesUrl}
        uploadSuccess={Boolean(demoFilesUrl)}
      />
      <AlertBox type={alert.type} message={alert.message} />
    </div>
  );
};

export default UploadDemoFiles;
