import { useEffect, useState, useCallback } from "react";
import { updateEvent, deleteMyEvent, getMyEvents } from "../../utility/api";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Link, Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";

function MyEvents(props) {
  const params = useParams();
  const [events, setEvents] = useState();
  const [idsToDelete, setIdsToDelete] = useState();

  const columns = [
    { field: "id", headerName: "ID", width: 70, editable: true },
    {
      field: "eventName",
      headerName: "Event Name",
      width: 180,
      editable: true,
    },
    {
      field: "eventDescription",
      headerName: "Description",
      width: 180,
      editable: true,
    },
    {
      field: "eventDate",
      headerName: "Date",
      width: 180,
      editable: true,
      valueFormatter: params => new Date(params?.value).toLocaleDateString()
    },
  ];
  
  const rows = events;
  console.log(rows);

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
        console.log(id);
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

  if (!events) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Container sx={{ mt: 5, mb: 5 }}>
        <Box sx={{ height: 620, width: "100%", bgcolor: "#DBD8AE" }}>
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
      </Container>
    </>
  );
}

export default MyEvents;
