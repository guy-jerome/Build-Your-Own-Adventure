import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Adventures from './Adventures';
import Container from "@mui/material/Container";

import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function Landing(){

  const {user, updateUser} = useContext(UserContext)

  console.log(user)
  return(
    <Container
    maxWidth="lg"
    sx={{
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
      justifyContent: "center",
    }}
    >
      <Typography variant='h2'>Adventure Builder</Typography>
      <Box>
        <Box>
          <Typography variant='h5'>Featured Adventures</Typography>
          <Adventures/>
        </Box>
        <Box>
          <Button>Build An Adventure</Button>
          <Button>Login</Button>
        </Box>
      </Box>
    </Container>
  )

}