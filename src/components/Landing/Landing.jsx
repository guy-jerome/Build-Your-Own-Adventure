import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Adventures from './Adventures';
import Container from "@mui/material/Container";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Banner from '../Banner/Banner.jsx'


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
      <Banner/>
      <Box>
        <Box>
          {/* This is only during production */}
          {/* {
          user.username ? (
            <>
            <Button onClick={()=>{navigate('/builder')}}>Build An Adventure</Button>
            <Button>{`Go to ${user.username}'s Profile`}</Button>
            </>

          ):(
            <>
            <Button onClick={()=>{navigate('/login')}}>Login</Button>
            <Button onClick={()=>{navigate('/register')}}>Register</Button>
            </>
          )
          } */}
            <Button onClick={()=>{navigate('/builder')}}>Build An Adventure</Button>
            <Button>{`Go to ${user.username}'s Profile`}</Button>
            <Button onClick={()=>{navigate('/login')}}>Login</Button>
            <Button onClick={()=>{navigate('/register')}}>Register</Button>
        </Box>
        <Box>
          <Typography variant='h5'>Featured Adventures</Typography>
          <Adventures currentAdventure={currentAdventure} handleCurrentAdventure={handleCurrentAdventure}/>
        </Box>
      </Box>
    </Container>
  )

}