import * as React from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

const myAlert = (alertTxt, handleUndo) => {
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

export default myAlert;
