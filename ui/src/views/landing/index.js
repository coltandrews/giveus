import { Box, Container, Typography, CssBaseline, Button, Link } from "@mui/material";
import * as React from "react";
import EventDonationCard from "../../components/EventDonationCard";
import { useParams } from "react-router-dom";
function Landing() {
  
  return (
    <>
      <Container component="main" maxWidth='md' sx={{ padding: "2%" }}>
        <CssBaseline />
        <Box
          sx={{
            marginBottom: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: 'center',
            marginTop: '20%'
          }}
        >
          <Typography variant={"h1"}>Welcome to GiveUs</Typography>
          <Box width={"50%"} fontStyle={"italic"}>
            <Typography variant={"h6"}>
              - where we connect nonprofits with caring donors. Discover
              impactful causes and make a difference effortlessly. Join us in
              transforming lives together.
            </Typography>
            <Box
              sx={{
                marginBottom: 6,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Link href={'/register'}>
                <Button variant="contained" sx={{ mt: 5, mr: 2 }}>
                  Sign up now
                </Button>
              </Link>
              <Link href={'/login'}>
                <Button variant="contained" sx={{ mt: 5 }}>
                  Already a user?
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Landing;
