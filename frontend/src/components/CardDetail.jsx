import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "../css/carddetail.css"
import axios from "axios";

const CardDetail = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://exercisedb.p.rapidapi.com/exercises',
          headers: {
            'X-RapidAPI-Key': '31ca6d8c30mshfb7e547c5f0e2d8p186657jsn721689d12d6f', 
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
          }
        };

        const response = await axios.request(options);
        const data = response.data;

        // Filter or select specific exercises if needed
        const selectedExercises = data.slice(5,6); // Get first 4 exercises for example
        setExercises(selectedExercises);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  return (
    <Box
      sx={{
        p: 2,
        border: '1px solid grey',
        borderRadius: '8px',
        maxWidth: '400px',
        margin: '0 auto',
        textAlign: 'center',
        backgroundColor: 'transparent',
      }}
    >
      <Typography variant="h5" component="div" gutterBottom>
        Workout Plan
      </Typography>
      {exercises.map((exercise) => (
        <Box key={exercise.id} sx={{ mb: 2 }}>
          <Typography variant="h6">{exercise.name}</Typography>
          <img src={exercise.gifUrl} alt={exercise.name} style={{ width: '100%', borderRadius: '8px' }} />
        </Box>
      ))}
    </Box>
  );
};

export default CardDetail;
