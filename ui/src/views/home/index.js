import { useEffect, useState } from "react";
import { getMe, getAllDonations } from "../../utility/api";
import { getToken } from "../../utility/utils";
import { Box, Grid, Paper, Typography } from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const boatCruiseImg = require('../../assets/images/donated_item_1.jpeg')
function Home() {
  const [me, setMe] = useState();

  const [donations, setDonations] = useState();

  useEffect(() => {
    const getMyData = async () => {
      if (getToken()) {
        const myData = await getMe();
        setMe(myData);
      }
    };
    getMyData();
  }, []);

  useEffect(() => {
    const getDonationData = async () => {
      if (getToken()) {
        const donationData = await getAllDonations();
        setDonations(donationData);
      }
    };
    getDonationData();
  }, [me]);

  const convertDate = (date) => {
    let dateString = new Date(date).toLocaleDateString();
    return "Posted on " + dateString;
  };

  if (!me) {
    return <></>;
  }
  if (!donations) {
    return <></>;
  }
  if (me.role === "auctioneer") {
    return (
      <>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          marginBottom="50px"
        >
          <Grid
            container
            spacing={3}
            direction="row"
            sx={{ width: "80%", mt: "2%" }}
          >
            {donations.map((donation) => {
              return (
                <Grid
                  item
                  style={{ display: "flex" }}
                  lg={3}
                  md={3}
                  sm={6}
                  xs={12}
                >
                  <Card
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                      minWidth: '100%'
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar
                          sx={{ bgcolor: '#994636' }}
                          aria-label="donation"
                        >
                          {donation.firstname.split("")[0]}
                          {donation.lastname.split("")[0]}
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={donation.itemName}
                      subheader={convertDate(donation.createdAt)}
                    />
                    <CardMedia
                      component="img"
                      height="194"
                      image={boatCruiseImg}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {donation.itemDescription}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </>
    );
  }
}

export default Home;
