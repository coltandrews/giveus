import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import { Link, Grid, Button, Typography } from "@mui/material";

const DonationCard = (props) => {
  const { donation } = props;

  const convertDate = (date) => {
    let dateString = new Date(date).toLocaleDateString();
    return "Posted on " + dateString;
  };

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
          <CardActions disableSpacing sx={{justifyContent: 'center', mb:2}}>
            <IconButton aria-label="add to favorites">
              <Link href={``}>
                <Button variant="contained">Request Donation</Button>
              </Link>
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default DonationCard;
