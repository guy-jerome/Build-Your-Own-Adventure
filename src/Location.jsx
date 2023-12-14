import Box from '@mui/material/Box'
export default function Location({location}){
  return(
  <Box>
    {location.name}
    {location.paths}
  </Box>
  )
}