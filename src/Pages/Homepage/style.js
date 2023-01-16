import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

// const theme=createTheme({
//   spacing:3,
//   breakpoints:{
//     values:{
//       xs: 0,
//       sm: 600,
//       md: 900,
//       lg: 1200,
//       xl: 1536,
//     }
//   },
// })

const theme = createTheme();

export default makeStyles(() => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: "1rem",
    padding: "10px",
    display: "flex",
  },
  pagination: {
    borderRadius: 4,
    marginTop: "1rem",
    padding: "1rem",
  },
  [theme.breakpoints.down("xs")]: {
    mainContainer: {
      flexDirection: "column-reverse",
    },
  },
}));
