import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(MUITheme => ({
  grayBox: {
    padding: "50px 45px",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: MUITheme.palette.border.grey,
    borderRadius: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F8F8",
    cursor: "pointer",
    textAlign: "center",
    "& svg": {
      color: MUITheme.palette.primary.main,
      fontSize: 40,
    },
    "& p": {
      "&:first-of-type": {
        color: MUITheme.palette.text.lightGrey,
        fontSize: 14,
        "& span": { color: MUITheme.palette.primary.main },
      },
      "&:last-of-type": {
        color: "#4a4a4a",
        fontSize: 12,
      },
    },
  },
  title: {
    color: MUITheme.palette.text.lightGrey,
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 0.25,
    lineHeight: "20px",
  },
  value: {
    color: MUITheme.palette.text.lightGrey,
    fontSize: 14,
    letterSpacing: 0.25,
    lineHeight: "20px",
  },
  uploadStatusContainer: {
    display: "flex",
    alignItems: "center",
    fontSize: 18,
    lineHeight: "23px",
    "& svg": {
      color: "#6D7278",
      fontSize: 41,
    },
    "& p": {
      marginLeft: 10,
      color: "rgba(0,0,0,0.25)",
      fontSize: 18,
      lineHeight: "23px",
    },
  },
  successfullUpload: {
    display: "flex",
    alignItems: "center",
    "& svg": {
      color: MUITheme.palette.success.main,
      fontSize: 41,
    },
    "& p": {
      marginLeft: 10,
      color: MUITheme.palette.success.main,
    },
  },
  imgUploaderContainer: {
    display: "flex",
    "& > div": {
      "&:first-of-type": {
        width: 377,
        [MUITheme.breakpoints.down("sm")]: { width: "100%" },
      },
    },
    [MUITheme.breakpoints.down("sm")]: { flexDirection: "column" },
  },
  uploadDetails: {
    marginLeft: 27,
    "& > div": { marginBottom: 8 },
    [MUITheme.breakpoints.down("sm")]: { paddingTop: 25 },
  },
  uploadBtns: {
    marginTop: 20,
    "& a": {
      textDecoration: "none",
    },
    "& button": {
      padding: 0,
      "&:last-of-type": { marginLeft: 40 },
    },
  },
  errorField: {
    display: "flex",
    alignItems: "center",
    "& svg": {
      color: MUITheme.palette.error.main,
      fontSize: 41,
    },
    "& p": {
      marginLeft: 10,
      color: MUITheme.palette.error.main,
    },
  },
}));
