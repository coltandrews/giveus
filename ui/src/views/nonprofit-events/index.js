import { useEffect, useState } from "react";
import { getMe, getEventsByUserId } from "../../utility/api";
import { getToken } from "../../utility/utils";
import { Box, Grid, Typography } from "@mui/material";
import * as React from "react";
import EventCard from "../../components/EventCard";
import { useParams } from "react-router-dom";
function NonprofitEvents() {
  const params = useParams();
  const [me, setMe] = useState();
  const [eventsData, setEventsData] = useState();

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
    const getEventsData = async () => {
      if (getToken()) {
        const tempEventData = await getEventsByUserId(params.id);
        setEventsData(tempEventData);
      }
    };
    getEventsData();
  }, [me]);

  if (!me) {
    return <></>;
  }
  if (!eventsData) {
    return <></>;
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        minHeight="100vh"
        marginBottom="50px"
      >
        <Grid
          container
          spacing={3}
          display={'flex'}
          flexDirection={"column"}
          alignItems={'center'}
          sx={{ width: "80%", mt: 3 }}
        >
          <Grid item>
            <Typography variant='h5'>
              Upcoming Events for <b>{eventsData[0].organizationName}</b>
            </Typography>
          </Grid>
          <Grid container spacing={3} direction="column" sx={{ mt: 3, width: '70%' }}>
            {eventsData.map((eventData) => {
              return <EventCard eventData={eventData}></EventCard>;
            })}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default NonprofitEvents;
