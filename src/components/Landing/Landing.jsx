import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Adventures from './Adventures';

export default function Landing(){
  <>
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
  </>
}