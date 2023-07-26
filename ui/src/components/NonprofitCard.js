import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import EventIcon from "@mui/icons-material/Event";
import { Grid, Typography, Link, Button } from "@mui/material";

const NonprofitCard = (props) => {
  const { nonprofit } = props;

  const convertDate = (date) => {
    let dateString = new Date(date).toLocaleDateString();
    return "Joined " + dateString;
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
            titleTypographyProps={{ variant: "h6" }}
            title={nonprofit.organizationName}
            subheader={convertDate(nonprofit.createdAt)}
          />
          <CardMedia
            component="img"
            height="194"
            image={`./images/${nonprofit.image}`}
            sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {nonprofit.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing sx={{justifyContent: 'center', mb:2}}>
            <IconButton aria-label="share">
              <Link href={`/events/${nonprofit.id}`}>
                <Button variant="contained">View Events</Button>
              </Link>
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default NonprofitCard;
