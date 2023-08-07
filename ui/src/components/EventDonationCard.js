import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState, Fragment } from "react";
import { Grid, Typography } from "@mui/material";
import { getMyEvents } from "../utility/api";


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
            image={`../images/${donation.itemImage}`}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {donation.itemDescription}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Valued at: ${donation.value}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {donation.firstname} {donation.lastname}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Contact: {donation.phoneNumber}
            </Typography>
            <Typography variant="h6" color="text.secondary">
                   {donation.email}
            </Typography>
           
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default DonationCard;
