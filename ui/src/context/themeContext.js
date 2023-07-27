import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#994636",
    },
    secondary: {
      main: "#CA907E",
      light: "DBD8AE",
      lighter: "EAF4D3"
    },
    background: {
      default: "#EAF4D3",
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
