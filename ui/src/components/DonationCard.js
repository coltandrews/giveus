import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import { useEffect, useState, Fragment } from "react";
import { Link, Grid, Button, Typography } from "@mui/material";
import { getMyEvents, requestDonationForEvent } from "../utility/api";
import CloseIcon from "@mui/icons-material/Close";

const DonationCard = (props) => {
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
  const { donation, me } = props;
  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [myEvents, setMyEvents] = useState();

  useEffect(() => {
    const getMyEventData = async () => {
      const results = await getMyEvents(me.id);
      setMyEvents(results);
    };
    getMyEventData();
  }, []);

  const convertDate = (date) => {
    let dateString = new Date(date).toLocaleDateString();
    return "Posted on " + dateString;
  };
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const handleDonationRequest = async (e, eventId) => {
    setOpen(false);
    setSnackOpen(true);
    const data = {
      pendingEventId: eventId,
      donorId: donation.userId,
      auctioneerId: me.id,
      donationId: donation.donationId,
      itemName: donation.itemName,
    };
    console.log(data);
    const response = await requestDonationForEvent(data);
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
  if (!myEvents) {
    return <></>;
  }
  return (
    <>
      <Grid item style={{ display: "flex" }} lg={4} md={6} sm={12} xs={12}>
        <Card
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            minWidth: "100%",
          }}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "#994636" }} aria-label="donation">
                {donation.firstname.split("")[0]}
                {donation.lastname.split("")[0]}
              </Avatar>
            }
            titleTypographyProps={{ variant: "h6" }}
            title={donation.itemName}
            subheader={convertDate(donation.createdAt)}
          />
          <CardMedia
            component="img"
            height="194"
            image={`./images/${donation.itemImage}`}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {donation.itemDescription}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Valued at: ${donation.value}
            </Typography>
          </CardContent>
          <CardActions disableSpacing sx={{ justifyContent: "center", mb: 2 }}>
            <IconButton aria-label="add to favorites">
              <Link href={``}>
                <Button variant="contained" onClick={handleOpen}>
                  Request Donation
                </Button>
              </Link>
            </IconButton>
          </CardActions>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <h2 id="parent-modal-title">Choose Event</h2>
              {myEvents.map((myEvent) => {
                return (
                  <div>
                    {myEvent.eventName}
                    <Button
                      onClick={(e) => handleDonationRequest(e, myEvent.id)}
                    >
                      Request
                    </Button>
                  </div>
                );
              })}
            </Box>
          </Modal>
          <Snackbar
            open={snackOpen}
            autoHideDuration={6000}
            onClose={handleSnackClose}
            message="Donation Requested!"
            action={action}
          />
        </Card>
      </Grid>
    </>
  );
};

export default DonationCard;
