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
import { getMe, postEvent } from "../../utility/api";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";

const NewEvent = (props) => {
  const navigate = useNavigate()
  const [newEvent, setNewDonation] = useState();
  const [image, setImage] = useState();
  const [eventDate, setEventDate] = useState();
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

  const handleDateChange = (date) => {
    const dateString = `${date.$y}/${date.$M}/${date.$D}`;
    setEventDate(dateString);
  };
  const handleChange = (e) => {
    setNewDonation({ ...newEvent, [e.target.name]: e.target.value });
  };
  const handleImageChange = async (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const me = await getMe();
    formData.append("eventImage", image);
    formData.append("eventName", newEvent.eventName);
    formData.append("eventDescription", newEvent.eventDescription);
    formData.append("eventDate", eventDate);
    formData.append("userId", me.id);
    setTimeout(()=>{navigate(`/my/events/${me.id}`);}, 1500)
    const response = await postEvent(formData);
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
            Create New Event
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
                  required
                  fullWidth
                  name="eventName"
                  label="Event Name"
                  type="text"
                  id="eventName"
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: 3 }}>
                <TextField
                  required
                  fullWidth
                  name="eventDescription"
                  label="Event Description"
                  type="text"
                  id="eventDescription"
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid container>
                <Grid item xs={6} sx={{ mt: 1 }}>
                  <Button variant="contained" component="label">
                    <AddAPhotoIcon />
                    <input
                      required
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      onChange={(e) => handleDateChange(e)}
                      id="eventDate"
                      key="eventDate"
                      label="Event Date"
                      format="YYYY/MM/DD"
                    />
                  </LocalizationProvider>
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
              Create Event
            </Button>
          </Box>
        </Box>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Event Created!"
          action={action}
        />
      </Container>
    </>
  );
};

export default NewEvent;
