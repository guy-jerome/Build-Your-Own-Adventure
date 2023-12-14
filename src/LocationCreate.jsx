import { useState } from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Autocomplete, InputLabel, TextField} from '@mui/material';

import Path from './Path.jsx'
import location from "./location.js";
import Locations from './Locations.jsx';
export default function LocationCreate({locations,addLocation, updateLocations}) {

  //STATE
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [paths, setPaths] = useState([]);
  const [locationName, setLocationName] = useState("")
  const [locationDescription, setLocationDesription] = useState("")
  const [currentLocation, setCurrentLocation] = useState(null)

  //FUNCTIONS
  function handleAddPath(){
    if (selectedLocation && !paths.includes(selectedLocation)) {
      setPaths(prevPaths => [...prevPaths, {location:selectedLocation,description:""}]);
      // You can also reset the selected location if needed
      setSelectedLocation(null);
    }
  }

  function handleDelete(path){
    setPaths((prevPaths) => prevPaths.filter((i) => i !== path));
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

  function handleSetLocation(location){
    setCurrentLocation(location)
    setPaths(location.paths)
    setLocationName(location.name)
    setLocationDesription(location.description)
  }

  //RETURN
  return (
      <>
        <Box sx={{display:'flex', flexDirection:'column', alignContent: 'center', justifyContent: 'center'}}>
          <Box sx={{display:'flex', justifyContent: 'space-between'}}>
            <Typography variant="h2">Location</Typography>
            <Button variant='contained'>Play</Button>
          </Box>

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
            <Path key={index} path={path} handleDelete={handleDelete} paths={paths}/>
          ))}
        </Box>
        <Button variant='outline' onClick={saveLocation}>Save</Button>
        <Locations locations={locations} handleSetLocation={handleSetLocation}/>
      </>
  );
}


