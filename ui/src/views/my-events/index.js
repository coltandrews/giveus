import { useEffect, useState, useCallback } from "react";
import {
  updateEvent,
  deleteMyEvent,
  getMyEvents,
  getMe,
} from "../../utility/api";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Link, Box, Grid, Typography, Divider } from "@mui/material";
import { useParams } from "react-router-dom";

function MyEvents(props) {
  const params = useParams();
  const [events, setEvents] = useState();
  const [idsToDelete, setIdsToDelete] = useState();
  const [me, setMe] = useState();

  const columns = [
    { field: "id", headerName: "ID", width: 70, editable: true },
    {
      field: "eventName",
      headerName: "Event Name",
      width: 180,
      editable: true,
    },
    {
      width: 180,
      renderCell: (params) => (
        <>
          <Link href={`/event/${params.id}`}>
            <Button variant="contained">View Donations</Button>
          </Link>
        </>
      ),
    },
  ];

  const rows = events;

  useEffect(() => {
    const getEvents = async () => {
      const eventsData = await getMyEvents(params.id);
      setEvents(eventsData);
    };
    getEvents();
  }, []);

  const handleDeleteEvents = async () => {
    Promise.allSettled(
      idsToDelete.map(async (id) => {
        return await deleteMyEvent(id);
      })
    ).then(async () => {
      const eventsData = await getMyEvents(params.id);
      setEvents(eventsData);
    });
  };

  const processRowUpdate = useCallback(async (updatedRow) => {
    return await updateEvent(updatedRow);
  }, []);

  useEffect(() => {
    const getMyData = async () => {
      const results = await getMe();
      setMe(results);
      console.log(results);
    };
    getMyData();
  }, []);

  if (!events) {
    return <div>Loading...</div>;
  }
  if (!me) {
    return <></>;
  }
  return (
    <>
      <Grid container sx={{ display: "flex" }}>
        <Grid item xs={12} sm={12} md={6} lg={6} sx={{ mt: 10, mb: 5 }}>
          <Typography sx={{ml: 5, width: '90%' }} variant={"h2"}>{me.organizationName}</Typography>
          <Box sx={{ mt: 2, ml: 7, width: '80%' }}>
            <Typography variant={"h6"}>{me.description}</Typography>
          </Box>
          <Box sx={{ mt: 4, ml: 1 }}>
            <img src={`../../images/${me.image}`} width={"50%"}></img>
          </Box>
        </Grid>
        <Grid
          item
          maxWidth={"sm"}
          sx={{ mt: 5, mb: 5, textAlign: "left" }}
          xs={12}
          sm={12}
          md={6}
          lg={6}
        >
          <Typography variant={"h5"} sx={{ ml: 4 }}>
            Upcoming Events
          </Typography>
          <Divider sx={{ m: 2, width: "80%", bgcolor: "black" }}></Divider>
          <Box sx={{ height: 420, width: "80%", bgcolor: "#DBD8AE", ml: 2 }}>
            <DataGrid
              sx={{ fontSize: "18px" }}
              editMode="row"
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              processRowUpdate={processRowUpdate}
              onRowSelectionModelChange={(ids) => {
                setIdsToDelete(ids);
              }}
            />
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Button
                sx={{ margin: "10px" }}
                variant="contained"
                onClick={handleDeleteEvents}
              >
                Delete Selected Events
              </Button>
              <Link href="/event/new">
                <Button sx={{ margin: "10px" }} variant="contained">
                  Create New Event
                </Button>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default MyEvents;
