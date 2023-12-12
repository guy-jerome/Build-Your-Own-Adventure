import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Autocomplete, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';


function App() {
  const locations = [
    {label: 'FarmHouse'}
  ]
  return (
    <Container>
      <Box>
        <Typography variant="h2">Location</Typography>
        <InputLabel htmlFor="location-name">Name</InputLabel>
        <TextField id="location-name"></TextField>
        <InputLabel htmlFor="location-description">Description</InputLabel>
        <TextField id="location-description"></TextField>
        <Typography variant='h4'>Create a Path</Typography>
        <Autocomplete
          disablePortal
          id="locations"
          options={locations}
          renderInput={(params) => <TextField {...params} label="Locations" />}
        />
        <Button>Add</Button>
      </Box>
      <Grid></Grid>
    </Container>
  )
}

export default App
