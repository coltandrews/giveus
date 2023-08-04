import {
  Box,
  Grid,
  TextField,
  Button,
  Avatar,
  CssBaseline,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Snackbar,
  IconButton,
} from "@mui/material";
import { Fragment } from "react";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe, postDonation } from "../../utility/api";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CloseIcon from "@mui/icons-material/Close";

const NewDonation = (props) => {
  const navigate = useNavigate();
  const [newDonation, setNewDonation] = useState();
  const [image, setImage] = useState();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (e) => {
    setNewDonation({ ...newDonation, [e.target.name]: e.target.value });
  };
  const handleImageChange = async (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const me = await getMe();
    formData.append("image", image);
    formData.append("itemName", newDonation.itemName);
    formData.append("itemDescription", newDonation.itemDescription);
    formData.append("value", newDonation.value);
    formData.append("userId", me.id);
    setTimeout(()=>{navigate(`/my/donations/${me.id}`);}, 1500)
    const response = await postDonation(formData);
      
  };

  const action = (
    <Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );
  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ padding: "5%" }}>
        <CssBaseline />
        <Box
          sx={{
            marginBottom: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AddCircleOutlineIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Post New Donation
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, mb: 2, width: "75%" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ mb: 1 }}>
                <TextField
                  fullWidth
                  name="itemName"
                  label="What are you donating?"
                  type="text"
                  id="itemName"
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  name="itemDescription"
                  label="Describe your donation"
                  type="text"
                  id="itemDescription"
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid container>
                <Grid item xs={6} sx={{ mt: 1 }}>
                  <Button variant="contained" component="label">
                    <AddAPhotoIcon />
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
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Value
                    </InputLabel>
                    <OutlinedInput
                      name="value"
                      id="value"
                      onChange={(e) => handleChange(e)}
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      label="Amount"
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Button
              onClick={handleClick}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit New Donation
            </Button>
          </Box>
        </Box>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Donation Submitted!"
          action={action}
        />
      </Container>
    </>
  );
};

export default NewDonation;
