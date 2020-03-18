import React, { Fragment, useCallback, useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import isEmpty from "lodash/isEmpty";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useStyles } from "./styles";
import SNETFileUpload from "shared/dist/components/SNETFileUpload";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import { aiServiceDetailsActions } from "../../../../Services/Redux/actionCreators";
import { assetTypes } from "../../../../Utils/FileUpload";

const UploadProto = () => {
  const classes = useStyles();
  const [alert, setAlert] = useState({});
  const serviceDetails = useSelector(state => state.aiServiceDetails);
  const [selectedFile, setSelectedFile] = useState({ name: "", size: "", type: "" });
  const dispatch = useDispatch();
  const { orgUuid, serviceUuid } = useParams();

  useEffect(() => {
    if (!alert.message && Boolean(serviceDetails.assets.protoFiles.url)) {
      setAlert({
        type: alertTypes.SUCCESS,
        message: "File have been uploaded. You can download your files on clicking the download button",
      });
    }
  }, [serviceDetails.assets.protoFiles.url, alert.message]);

  const handleDrop = useCallback(
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
            aiServiceDetailsActions.uploadFile(assetTypes.SERVICE_PROTO_FILES, fileBlob, orgUuid, serviceUuid)
          );
          dispatch(aiServiceDetailsActions.setServiceDetailsProtoUrl(url));
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
    <Fragment>
      <Typography variant="subtitle1">Upload the Proto files</Typography>
      <Typography className={classes.description}>
        Lorem ipsum dolor sit amet, consectetur et mihi. Accusatores directam qui ut accusatoris. Communiter videbatur
        hominum vitam ut qui eiusdem fore accommodatior maximis vetere communitatemque.
      </Typography>
      <SNETFileUpload
        onDrop={handleDrop}
        accept={acceptedFileTypes}
        multiple={false}
        showFileDetails
        fileName={selectedFile.name}
        fileSize={selectedFile.size}
        fileDownloadURL={serviceDetails.assets.protoFiles.url}
        uploadSuccess={Boolean(serviceDetails.assets.protoFiles.url)}
      />
      <AlertBox type={alert.type} message={alert.message} />
    </Fragment>
  );
};

export default UploadProto;
