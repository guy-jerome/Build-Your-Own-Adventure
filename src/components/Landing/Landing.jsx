import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Adventures from './Adventures'; // Component for displaying adventures
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext'; // Context for user data
import Banner from '../Banner/Banner.jsx'; // Component for the banner display

export default function Landing({ currentAdventure, handleCurrentAdventure }) {
  const navigate = useNavigate(); // Hook for navigation between routes
  const { user, updateUser } = useContext(UserContext); // Get user data from context

  // Reset the current adventure when the component mounts (prevents issues on reload)
  useEffect(() => {
    handleCurrentAdventure(null);
  }, []);

  return (
    <Container
      maxWidth="lg" // Set a maximum container width
      sx={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ backgroundColor: "accent.main", height: "100vh" }}>
        <Banner /> {/* Display the banner component */}

        <Box>
          {/* Conditional Buttons: 
              - If user is logged in and not "admin", show "Build An Adventure" and "Profile" buttons
              - Otherwise, show "Login" and "Register" buttons */}
          {user.username && user.username !== "admin" ? (
            <>
              <Button onClick={() => { navigate('/builder') }}>
                Build An Adventure
              </Button>
              <Button onClick={() => { navigate('/account') }}>
                Go to {user.username}'s Profile
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => { navigate('/login') }}>Login</Button>
              <Button onClick={() => { navigate('/register') }}>Register</Button>
            </>
          )}
        </Box>

        {/* Featured Adventures Section */}
        <Box
          sx={{
            border: 4,
            borderColor: 'secondary.main',
            borderRadius: 2,
            width: '50%',
            display: 'flex', // Enable flexbox layout
            flexDirection: 'column', // Items arranged vertically
            alignItems: 'center', // Center items horizontally
            justifyContent: 'center', // Center items vertically
            margin: '20px auto', // Add margin for spacing
            padding: '20px', // Add padding within the box
          }}
        >
          <Typography variant='h5'>Featured Adventures</Typography>
          <Adventures handleCurrentAdventure={handleCurrentAdventure} />
        </Box>
      </Box>
    </Container>
  );
}