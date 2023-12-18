import { Button } from "@mui/material"
import Box from '@mui/material/Box'

export default function Locations({locations, handleSetLocation}){
  return(
    <Box sx={{display:'flex',flexWrap:'wrap'}}>
      {
        locations.map((location)=>(
          <Location location = {location} handleSetLocation={handleSetLocation}/>
        ))
      }
    </Box>

  )
}

function Location({location, handleSetLocation}){
  return(
  <Box>
    <Button variant="contained" onClick={()=>{handleSetLocation(location)}}>
    {location.name}
    </Button>
  </Box>
  )
}