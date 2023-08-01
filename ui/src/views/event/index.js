import { useEffect, useState } from "react";
import { getMe, getMyDonations } from "../../utility/api";
import { getToken } from "../../utility/utils";
import { Box, Grid, Typography } from "@mui/material";
import * as React from "react";
import DonationCard from "../../components/DonationCard";
import { useParams } from "react-router-dom";
function MyEvent() {
  const params = useParams()
  const [me, setMe] = useState();
  const [donations, setDonations] = useState();

  useEffect(() => {
    const getMyData = async () => {
      if (getToken()) {
        const myData = await getMe();
        setMe(myData);
      }
    };
    getMyData();
  }, []);

  useEffect(() => {
    const getDonationData = async () => {
      if (getToken()) {
        const donationData = await getMyDonations(params.id);
        setDonations(donationData);
        console.log(donationData);
      }
    };
    getDonationData();
  }, [me]);

  if (!me) {
    return <></>;
  }
  if (!donations) {
    return <></>;
  }
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        marginBottom="50px"
      >
        <Grid
          containe
          spacing={3}
          direction="column"
          sx={{ width: "80%", mt: 3 }}
          r
        >
          <Grid item>
            <Typography variant="h4">
              <i>Find a Dononation</i>
            </Typography>
          </Grid>

          <Grid container spacing={3} direction="row" sx={{ mt: "2%" }}>
            {donations.map((donation) => {
              return <DonationCard donation={donation} me={me}></DonationCard>;
            })}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default MyEvent;
