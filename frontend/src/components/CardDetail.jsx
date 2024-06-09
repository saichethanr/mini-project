import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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

        const selectedExercises = data.slice(5,6);
        setExercises(selectedExercises);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  return (
    <div className="card-detail-container">
      {exercises.map((exercise) => (
        <Box key={exercise.id} className="exercise-box">
          <img src={exercise.gifUrl} alt={exercise.name} className="exercise-gif" />
        </Box>
      ))}
    </div>
  );
};

export default CardDetail;
