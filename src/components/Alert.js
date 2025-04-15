import * as React from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const MyAlert = ({ undoMode, handleUndo }) => {
  let alertTxt = "";
  console.log("undoMode", undoMode);
  switch (undoMode) {
    case "trash":
      alertTxt = "Note Deleted Successfully";
      break;
    case "restore":
      alertTxt = "Note Recovered Successfully";
      break;
    case "edit":
      alertTxt = "Note Edited";
      break;
    case "archive":
      alertTxt = "Note Archived Successfully";
      break;
    case "unarchive":
      alertTxt = "Note Unarchived Successfully";
      break;
    case "add":
      alertTxt = "Note Added Successfully";
      break;
    case "deleteLabel":
      alertTxt = "Label Deleted Successfully";
      break;
    default:
      alertTxt = "";
  }
  return (
    <Alert
      severity="success"
      action={
        <Button color="zinc-800" size="small" onClick={handleUndo}>
          UNDO
        </Button>
      }
    >
      {alertTxt}
    </Alert>
  );
};

export default MyAlert;
