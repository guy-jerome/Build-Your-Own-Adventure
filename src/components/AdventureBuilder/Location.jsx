import { Button } from '@mui/material'
import Box from '@mui/material/Box'
export default function Location({location, handleSetLocation}){
  return(
  <Box>
    <Button variant="contained" onClick={()=>{handleSetLocation(location)}}>
    {location.name}
    </Button>
  </Box>
  )
}