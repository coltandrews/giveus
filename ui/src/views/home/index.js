import { useEffect, useState } from "react";
import { getMe, getAllDonations, getAllNonprofits } from "../../utility/api";
import { getToken } from "../../utility/utils";
import { Box, Grid, Stack, Button } from "@mui/material";
import * as React from "react";
import DonationCard from "../../components/DonationCard";
import NonprofitCard from "../../components/NonprofitCard";
const boatCruiseImg = require("../../assets/images/donated_item_1.jpeg");
function Home() {
  const [me, setMe] = useState();

  const [donations, setDonations] = useState();
  const [nonprofits, setNonprofits] = useState();

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
        const donationData = await getAllDonations();
        setDonations(donationData);
      }
    };
    const getNonprofitData = async () => {
      if (getToken()) {
        const nonprofitData = await getAllNonprofits();
        setNonprofits(nonprofitData);
      }
    };
    getNonprofitData();
    getDonationData();
  }, [me]);

  if (!me) {
    return <></>;
  }
  if (!donations) {
    return <></>;
  }
  if (me.role === "auctioneer") {
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
            container
            spacing={3}
            direction="row"
            sx={{ width: "80%", mt: "2%" }}
          >
            {donations.map((donation) => {
              return <DonationCard donation={donation}></DonationCard>;
            })}
          </Grid>
        </Box>
      </>
    );
  }

  if (me.role === "donor") {
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
            container
            spacing={3}
            direction="row"
            sx={{ width: "80%", mt: "2%" }}
          >
            {nonprofits.map((nonprofit) => {
              return <NonprofitCard nonprofit={nonprofit}></NonprofitCard>;
            })}
          </Grid>
        </Box>
      </>
    );
  }
}

export default Home;
