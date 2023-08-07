import { useEffect, useState, useCallback, Fragment } from "react";
import {
  updateDonation,
  deleteMyDonation,
  getMyDonations,
  getRequestsByDonationId,
  acceptDonationRequest,
} from "../../utility/api";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Link,
  Box,
  Container,
  Grid,
  Typography,
  Divider,
  Snackbar
} from "@mui/material";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "react-router-dom";

function MyDonations(props) {
  const params = useParams();
  const [donations, setDonations] = useState();
  const [requests, setRequests] = useState();

  const [idsToDelete, setIdsToDelete] = useState();
  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

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
 
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };
  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

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
      renderCell: (params) => <>${params.value}</>,
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
    setSnackOpen(true);
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
      <Container sx={{ mt: 5, mb: 5, textAlign: "left" }}>
        <Typography variant="h3">My Donations</Typography>
        <Divider sx={{ mt: 2, mb: 2, bgcolor: "black" }}></Divider>
        <Box sx={{ height: 420, width: "100%", bgcolor: "#DBD8AE" }}>
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
        <Box sx={{ ...style }}>
          <h2 id="parent-modal-title">Active Requests</h2>
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
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        message="Donation Accepted!"
        action={action}
      />
    </>
  );
}

export default MyDonations;
