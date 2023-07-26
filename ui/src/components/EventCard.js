import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Grid, Typography } from "@mui/material";

const EventCard = (props) => {
  const { eventData } = props;
  console.log(eventData)

  const convertDate = (date) => {
    let dateString = new Date(date).toLocaleDateString();
    return dateString;
  };

  return (
    <>
      <Grid item style={{ display: "flex" }} lg={3} md={3} sm={6} xs={12}>
        <Card
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            minWidth: "100%",
          }}
        >
          <CardHeader
            title={eventData.eventName}
            subheader={convertDate(eventData.eventDate)}
          />
          <Grid container>
            <Grid item xs={6} sx={{ml: 2}}>
              <CardMedia
                component="img"
                height="194"
                image={`../images/${eventData.eventImage}`}
                sx={{borderRadius: '3px'}}
              />
            </Grid>
            <Grid item xs={5}>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {eventData.eventDescription}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
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
    </>
  );
};

export default EventCard;
