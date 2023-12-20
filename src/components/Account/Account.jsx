import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { UserContext } from '../../context/UserContext';
import Banner from '../Banner/Banner';

export default function Account() {
  const { user, url } = useContext(UserContext);
  const [userAdventures, setUserAdventures] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAdventures() {
      try {
        const req = await axios.get(`${url}/adventures/user/${user.username}`);
        setUserAdventures(req.data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error(error);
        setLoading(false); // Set loading to false on error
      }
    }
    getAdventures();
  }, [url, user.username]);

  return (
    <Container>
      <Banner />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 10,
          minHeight: '100vh', // Set minimum height to fill the viewport
        }}
      >
        <Typography variant="h4" sx={{ p: 2, m: 2 }}>
          User Account
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'flex-start',
            p: 2,
            border: 4,
            borderColor: 'primary.main',
            borderRadius: 4,
            marginBottom: 4,
          }}
        >
          <Typography variant="h4">Username</Typography>
          <Typography variant="h5">{user.username}</Typography>
        </Box>
        <Typography variant="h4">Your Adventures</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'center',
            p: 2,
            border: 4,
            borderColor: 'primary.main',
            borderRadius: 4,
            alignItems: 'center',
          }}
        >
          {loading ? ( // Render loading indicator if data is still loading
            <CircularProgress />
          ) : (
            userAdventures &&
            userAdventures.map((adventure) => (
              <Button
                key={adventure._id}
                variant="outlined"
                sx={{ my: 1 }}
              >
                {adventure.name}
              </Button>
            ))
          )}
        </Box>
      </Box>
    </Container>
  );
}
