import { useState } from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Autocomplete, InputLabel, TextField} from '@mui/material';

import Path from './Path.jsx'
import location from "./location.js";

export default function LocationCreate({locations,addLocation, updateLocations}) {

  //STATE
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [paths, setPaths] = useState([]);
  const [locationName, setLocationName] = useState("")
  const [locationDescription, setLocationDesription] = useState("")
  const [currentLocation, setCurrentLocation] = useState(null)

  //FUNCTIONS
  function handleAddPath(){
    if (selectedLocation && !paths.includes(selectedLocation.label)) {
      setPaths(prevPaths => [...prevPaths, selectedLocation.label]);
      // You can also reset the selected location if needed
      setSelectedLocation(null);
    }
  }

  function handleDelete(pathName){
    setPaths((prevPaths) => prevPaths.filter((path) => path !== pathName));
  }

  function saveLocation(){
    if (!currentLocation){
      const node = new location(locationName,locationDescription,)
      node.paths = paths
      addLocation(node)
      setCurrentLocation(node)
    }else{
      currentLocation.name = locationName
      currentLocation.label = locationName
      currentLocation.description = locationDescription
      currentLocation.paths = paths
      updateLocations()
    }
  }

  function handleNew(){
    setCurrentLocation(null)
    setLocationDesription("")
    setLocationName("")
    setPaths([])
  }

  //RETURN
  return (
      <>
        <Box sx={{display:'flex', flexDirection:'column', alignContent: 'center', justifyContent: 'center'}}>
          <Typography variant="h2">Location</Typography>
          <InputLabel htmlFor="location-name">Name</InputLabel>
          <TextField id="location-name" value={locationName} onChange={(e)=>{setLocationName(e.target.value)}}></TextField>
          <InputLabel htmlFor="location-description">Description</InputLabel>
          <TextField id="location-description" value={locationDescription} onChange={(e)=>{setLocationDesription(e.target.value)}}></TextField>
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
          <Button onClick={handleNew}>New</Button>
        </Box>
        {/* Display the paths */}
        <Box sx={{display:'flex',flexWrap:'wrap'}}>
          {paths.map((path, index) => (
            <Path key={index} pathName={path} handleDelete={handleDelete} paths={paths}/>
          ))}
        </Box>
        <Button variant='outline' onClick={saveLocation}>Save</Button>
      </>
  );
}


