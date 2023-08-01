import { useEffect, useState, useCallback } from "react";
import {
  updateDonation,
  deleteMyDonation,
  getMyDonations,
} from "../../utility/api";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Link, Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";

function MyDonations(props) {
  const params = useParams();
  const [donations, setDonations] = useState();
  console.log(donations);
  const [idsToDelete, setIdsToDelete] = useState();

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
      width: 180,
      editable: true,
    },
    {
      field: "requests",
      headerName: "Requests",
      width: 180,
      editable: true,
    },
  ];

  const rows = donations;
  console.log(rows);

  useEffect(() => {
    const getMyDonationData = async () => {
      const eventsData = await getMyDonations(params.id);
      setDonations(eventsData);
    };
    getMyDonationData();
  }, []);

  const handleDeleteDonations = async () => {
    Promise.allSettled(
      idsToDelete.map(async (id) => {
        console.log(id);
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
    </>
  );
}

export default MyDonations;
