import { Button } from '@mui/material'
import Box from '@mui/material/Box'
export default function Location({location}){
  return(
  <Box>
    <Button >
    {location.name}
    </Button>

  </Box>
  )
}