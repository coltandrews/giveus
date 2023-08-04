import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#153243",
    },
    secondary: {
      main: "#7CA5B8",
      light: "DBD8AE",
      lighter: "EAF4D3"
    },
    background: {
      default: "#F4F9E9",
    },
  },
});

const ThemeContextProvider = (props) => {
  const { children } = props;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeContextProvider;
