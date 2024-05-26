import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import sixtydays from "../img/60days.png";
import thirtydays from "../img/30days.png";
import ninetydays from "../img/90days.png";

const CardDetail = () => {
  return (
    <Box
      sx={{
        p: 2,
        border: '1px solid grey',
        borderRadius: '8px',
        maxWidth: '400px',
        margin: '0 auto',
        textAlign: 'center',
        backgroundColor: '',
      }}
    >
      <Typography variant="h5" component="div" gutterBottom>
        Workout Plan
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="40 Squat/day" />
        </ListItem>
        <ListItem>
          <ListItemText primary="45 ShoulderPress/day" />
        </ListItem>
        <ListItem>
          <ListItemText primary="2 min Plank/day" />
        </ListItem>
        <ListItem>
          <ListItemText primary="30 PushUps/day" />
        </ListItem>
      </List>
    </Box>
  );
};

export default CardDetail;
