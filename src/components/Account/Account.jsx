import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { UserContext } from '../../context/UserContext';
import Banner from '../Banner/Banner';
import { useNavigate } from 'react-router-dom';

export default function Account({handleCurrentAdventure}) {
  const { user, url } = useContext(UserContext);
  const [userAdventures, setUserAdventures] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAdventures() {
      try {
        const req = await axios.get(`${url}/adventures/user/${user.username}`);
        setUserAdventures(req.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    getAdventures();
  }, [url, user.username]);

  function playGame(adventure) {
    handleCurrentAdventure(adventure);
    navigate('/game');
  }

  return (
    <Container>
      <Banner />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'accent.main',
          p: 10,
          minHeight: '100vh',
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
            flexWrap:'wrap',
            alignSelf: 'center',
            p: 2,
            border: 4,
            borderColor: 'primary.main',
            borderRadius: 4,
            alignItems: 'center',
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            userAdventures &&
            userAdventures.map((adventure) => (
              <Box key={adventure._id} sx={{ display: 'flex', alignItems: 'center', m:.5, border: 4,
              borderColor: 'secondary.main',
              borderRadius: 2,}}>
                <Button variant="contained" onClick={()=>{playGame(adventure)}}>
                  {adventure.name}
                </Button>
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Container>
  );
}
