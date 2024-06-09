import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography } from '@mui/material';

const WorkOut = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleCardClick = (route) => {
    navigate(route); // Navigate to the specified route
  };

  const exercises = [
    { name: 'SQUATS', route: '/squat' },
    { name: 'PUSHUP', route: '/pushup' },
    { name: 'LEFT HAND RAISE', route: '/lhr' },
    { name: 'RIGHT HAND RAISE', route: '/rhr' },
  ];

  return (
    <Box
      sx={{
        textAlign: 'center',
        padding: 4,
        minHeight: '100vh',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{ color: 'white', marginBottom: '5rem' }}
      >
        WORK OUT
      </Typography>
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          padding: 4,
          borderRadius: 2,
          background: 'radial-gradient(circle, rgba(63,81,181,1) 0%, rgba(0,0,0,1) 100%)',
        }}
      >
        {exercises.map((exercise) => (
          <Card
            key={exercise.name}
            onClick={() => handleCardClick(exercise.route)} // Add onClick handler
            sx={{
              marginBottom: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer', // Change cursor to pointer on hover
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 8px 16px rgba(255, 255, 255, 0.2)',
              },
              '&:active': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 16px rgba(255, 255, 255, 0.4)',
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ color: 'white' }}>
                {exercise.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default WorkOut;
