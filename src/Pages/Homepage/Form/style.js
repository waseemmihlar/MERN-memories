import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

export default makeStyles(() => ({
  btn: {
    padding: "10px",
    width: "100%",
    color: "white",
    backgroundColor: "#0359a8",
    borderRadius: "6px",
    border: "none",
  },
}));
