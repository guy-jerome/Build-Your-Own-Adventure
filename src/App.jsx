import { useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Autocomplete, Grid, InputLabel, MenuItem, Paper, Select, TextField} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [paths, setPaths] = useState([]);
  
  const locations = [
    { label: 'FarmHouse' },
    { label: 'Garden Path'}
  ];

  const handleAddPath = () => {
    if (selectedLocation) {
      setPaths(prevPaths => [...prevPaths, selectedLocation.label]);
      // You can also reset the selected location if needed
      setSelectedLocation(null);
    }
  };

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
          value={selectedLocation}
          onChange={(event, newValue) => setSelectedLocation(newValue)}
          renderInput={(params) => <TextField {...params} label="Locations" />}
        />
        <Button onClick={handleAddPath}>Add</Button>
      </Box>

      {/* Display the paths */}
      <Box >
        {paths.map((path, index) => (
          <Path key={index} pathName={path} />
        ))}
      </Box>
    </Container>
  );
}

function Path({ pathName }) {
  return (
    <>
      <Typography variant='h3'>{pathName}</Typography>
      <InputLabel htmlFor="path-description">Path Description</InputLabel>
      <TextField id="path-description"></TextField>
      <IconButton aria-label="delete" size="large">
        <DeleteIcon fontSize="large" />
      </IconButton>
    </>
  );
}

export default App;
