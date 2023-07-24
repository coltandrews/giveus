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
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import ThemeContextProvider from "../../context/themeContext";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { register } from "../../utility/api";
import { setToken } from "../../utility/utils";

import SensorOccupiedSharpIcon from "@mui/icons-material/SensorOccupiedSharp";

function Register() {
  const [userData, setUserdata] = useState({
    role: "donor",
  });

  const handleChange = (event) => {
    setUserdata({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(userData);

    try {
      const response = await register(userData);
      //submit users token to jwt utility
      console.log(response.token);
      setToken(response.token);
      //redirect user to success page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <SensorOccupiedSharpIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="firstname"
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="phoneNumber"
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  autoFocus
                  onChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="address"
                  label="Street Address"
                  name="address"
                  autoComplete="address"
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
              <Grid item xs={12}>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="role"
                  >
                    <FormControlLabel
                      value="auctioneer"
                      control={<Radio />}
                      label="I am a nonprofit"
                      onChange={(e) => handleChange(e)}
                    />
                    <FormControlLabel
                      value="donor"
                      control={<Radio />}
                      label="I am a donor"
                      onChange={(e) => handleChange(e)}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {userData.role === "auctioneer" ? (
                <>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="organizationName"
                      label="Organization Name"
                      name="organizationName"
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="ein"
                      label="Employer Identification Number"
                      name="ein"
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                </>
              ) : null}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
export default Register;
