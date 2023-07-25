import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { login } from "../../utility/api";
import { setToken } from "../../utility/utils";
import LoginIcon from "@mui/icons-material/Login";
import { Stack } from "@mui/material";

function Login() {
  const [userData, setUserdata] = useState();
  const [loginFailed, setLoginFailed] = useState();

  const navigate = useNavigate();

  const handleChange = (event) => {
    setUserdata({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await login(userData);
      setToken(response.token);
      navigate("/home");
      window.location.reload();
    } catch (error) {
      console.log(error);
      setLoginFailed(true);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ padding: "5%" }}>
        <CssBaseline />
        <Box
          sx={{
            marginBottom: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LoginIcon></LoginIcon>
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, mb: 3, width: "75%" }}
          >
            <Grid container spacing={2}>
              {loginFailed ? (
                <>
                  <Grid item xs={12}>
                    <TextField
                      required
                      error
                      name="username"
                      fullWidth
                      id="username"
                      label="Username"
                      autoFocus
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      error
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      fontStyle={"italic"}
                      fontSize="12px"
                      color={"red"}
                    >
                      Invalid username/password combination
                    </Typography>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12}>
                    <TextField
                      required
                      name="username"
                      fullWidth
                      id="username"
                      label="Username"
                      autoFocus
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                </>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  Need an account? Sign up here
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Login;
