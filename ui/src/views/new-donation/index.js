import { Box, Grid, TextField, Button } from "@mui/material";
import Container from "@mui/material/Container";
import { useState } from "react";
import { getMe, postDonation } from "../../utility/api";
const NewDonation = (props) => {
  const [newDonation, setNewDonation] = useState();
  const [image, setImage] = useState();

  const handleChange = (e) => {
    setNewDonation({ ...newDonation, [e.target.name]: e.target.value });
  };
  const handleImageChange = async (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const me = await getMe()
    formData.append('image', image)
    formData.append('itemName', newDonation.itemName)
    formData.append('userId', me.id)
    const response = await postDonation(formData)
  };
  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ padding: "5%" }}>
        <Box
          sx={{
            marginBottom: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, mb: 3, width: "75%" }}
          >
            <Grid container>
              <Grid item xs={12} sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  name="itemName"
                  label="What are you donating?"
                  type="text"
                  id="itemName"
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  Upload Image
                  <input
                    hidden
                    accept="image/*"
                    name="image"
                    type="file"
                    id="image"
                    onChange={(e) => handleImageChange(e)}
                  />
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ mt: 3 }}>
                <Button variant="contained" type="submit">
                  Submit New Donation
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default NewDonation;
