import { useEffect, useState, useCallback } from "react";
import {
  updateDonation,
  deleteMyDonation,
  getMyDonations,
  getRequestsByDonationId,
  acceptDonationRequest,
} from "../../utility/api";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Link, Box, Container, Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useParams } from "react-router-dom";

function MyDonations(props) {
  const params = useParams();
  const [donations, setDonations] = useState();
  console.log(donations)
  const [requests, setRequests] = useState();

  const [idsToDelete, setIdsToDelete] = useState();
  const [open, setOpen] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70, editable: true },
    {
      field: "itemName",
      headerName: "Item Name",
      width: 180,
      editable: true,
    },
    {
      field: "itemDescription",
      headerName: "Description",
      width: 280,
      editable: true,
    },
    {
      field: "value",
      headerName: "Value",
      width: 280,
      editable: true,
      renderCell: (params) => (
        <>
          ${params.value}
        </>
      ),
    },
    {
      field: "requestcount",
      headerName: "Requests",
      width: 180,
      editable: true,
      renderCell: (params) => (
        <>
          {params.value > 0 ? (
            <Button variant="contained">Review Requests</Button>
          ) : (
            <></>
          )}
        </>
      ),
    },
  ];

  useEffect(() => {
    const getMyDonationData = async () => {
      const eventsData = await getMyDonations(params.id);
      setDonations(eventsData);
    };
    getMyDonationData();
  }, []);

  const handleOnCellClick = async (params) => {
    if (params.field === "requestcount") {
      setOpen(true);
      const results = await getRequestsByDonationId(params.id);
      setRequests(results);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteDonations = async () => {
    Promise.allSettled(
      idsToDelete.map(async (id) => {
        return await deleteMyDonation(id);
      })
    ).then(async () => {
      const eventsData = await getMyDonations(params.id);
      setDonations(eventsData);
    });
  };

  const processRowUpdate = useCallback(async (updatedRow) => {
    return await updateDonation(updatedRow);
  }, []);

  const handleRequestAccept = async (e, request) => {
    setOpen(false);
    const data = {
      eventId: request.pendingEventId,
    };
    await acceptDonationRequest(request.donationId, data);
  };

  if (!donations) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Container sx={{ mt: 5, mb: 5 }}>
        <Box sx={{ height: 620, width: "100%", bgcolor: "#DBD8AE" }}>
          <DataGrid
            sx={{ fontSize: "18px" }}
            editMode="row"
            rows={donations}
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
            onCellClick={handleOnCellClick}
          />
          <Button
            sx={{ margin: "10px" }}
            variant="contained"
            onClick={handleDeleteDonations}
          >
            Delete Selected Donations
          </Button>
          <Link href="/donation/new">
            <Button sx={{ margin: "10px" }} variant="contained">
              Add Donation
            </Button>
          </Link>
        </Box>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Choose Event to Accept</h2>
          {requests ? (
            requests.map((request) => {
              return (
                <Grid
                  container
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    {request.organizationName}
                  </Grid>
                  <Grid item xs={6}>
                    <Button onClick={(e) => handleRequestAccept(e, request)}>
                      Accept
                    </Button>
                  </Grid>
                </Grid>
              );
            })
          ) : (
            <></>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default MyDonations;
