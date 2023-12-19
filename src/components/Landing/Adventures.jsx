import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Adventures({ currentAdventure, handleCurrentAdventure }) {
  const { url } = useContext(UserContext);
  const [adventures, setAdventures] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAdventures() {
      try {
        const results = await axios.get(`${url}/adventures`);
        setAdventures(results.data);
      } catch (error) {
        console.error('Error fetching adventures:', error);
      }
    }
    getAdventures();
  }, [url]);

  function playGame(adventure) {
    handleCurrentAdventure(adventure);
    navigate('/game');
  }

  return (
    <Box>
      {adventures ? (
        adventures.map((adventure) => (
          <Button
            key={adventure.id}
            onClick={() => playGame(adventure)}
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            {adventure.name}
          </Button>
        ))
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}
