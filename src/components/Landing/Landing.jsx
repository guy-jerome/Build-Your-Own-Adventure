import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Adventures from './Adventures';
import Container from "@mui/material/Container";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';



export default function Landing({currentAdventure, handleCurrentAdventure}){
  const navigate = useNavigate()
  const {user, updateUser} = useContext(UserContext)


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
          <Adventures currentAdventure={currentAdventure} handleCurrentAdventure={handleCurrentAdventure}/>
        </Box>
        <Box>
          <Button onClick={()=>{navigate('/builder')}}>Build An Adventure</Button>
          <Button onClick={()=>{navigate('/login')}}>Login</Button>
          <Button onClick={()=>{navigate('/register')}}>Register</Button>
        </Box>
      </Box>
    </Container>
  )

}