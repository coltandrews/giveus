import { useEffect, useState } from "react";
import { getDonationsByEventId, getMe, getEventById } from "../../utility/api";
import { getToken } from "../../utility/utils";
import { Box, Grid, Typography } from "@mui/material";
import * as React from "react";
import EventDonationCard from "../../components/EventDonationCard";
import { useParams } from "react-router-dom";
function MyEvent() {
  const params = useParams();
  const [me, setMe] = useState();
  const [eventData, setEventData] = useState();
  const [donations, setDonations] = useState();
  console.log(donations);

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
        const donationData = await getDonationsByEventId(params.id);
        setDonations(donationData);
      }
    };
    const getEventData = async () => {
      if (getToken()) {
        const eventData = await getEventById(params.id);
        setEventData(eventData);
      }
    };

    getDonationData();
    getEventData();
  }, [me]);

  if (!me) {
    return <></>;
  }
  if (!donations) {
    return <></>;
  }
  if (!eventData) {
    return <></>;
  }
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        minHeight="100vh"
        marginBottom="50px"
        marginTop={2}
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
              Donations for {eventData[0].eventName}
            </Typography>
          </Grid>
          {donations.length > 0 ? (
            <Grid container spacing={3} direction="row" sx={{ mt: "2%" }}>
              {donations.map((donation) => {
                return (
                  <EventDonationCard
                    donation={donation}
                    me={me}
                  ></EventDonationCard>
                );
              })}
            </Grid>
          ) : (
            <Typography fontStyle={'italic'} variant="h5" marginTop={2}>
              No donations found, please request donations for your event.
            </Typography>
          )}
        </Grid>
      </Box>
    </>
  );
}

export default MyEvent;
