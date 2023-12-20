import { useState, useEffect} from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Autocomplete, InputLabel, TextField} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'

import Path from './Path.jsx'
import location from "../../classes/location.js";
import path from "../../classes/path.js";
import findLocation from '../../utils/findLocation.js';
import Locations from './Locations.jsx';
import { LocationSearching } from '@mui/icons-material';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function LocationCreate({currentAdventure, updateAdventure, handleBuilderPage, handleCurrentAdventure}) {

  const {user, updateUser, url} = useContext(UserContext)

  // const farmHouse = new location("Farm House","A small farm house." )
  // const gardenPath = new location("Garden Path", "A quaint garden path.")
  // const riverBank = new location("River Bank", "A small river bank.")
  // const gardenP = new path("Garden Path","A small path leads down to a small garden.")
  // const riverP = new path("River Bank","A small path leads down the road towards a river.")
  // farmHouse.paths = [gardenP,riverP]

  const [locations, setLocations] = useState(currentAdventure.locations?currentAdventure.locations:[])
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [paths, setPaths] = useState([]);
  const [locationName, setLocationName] = useState("")
  const [locationDescription, setLocationDesription] = useState("")
  const [currentLocation, setCurrentLocation] = useState(null)

  //FUNCTIONS

  async function addLocation(location){
    await setLocations([...locations, location])
  }

  async function updateLocations(){
    await setLocations([...locations])
  }

  function handleAddPath(){
    if (selectedLocation) {
      setPaths(prevPaths => [...prevPaths, new path(selectedLocation.name)]);
      // You can also reset the selected location if needed
      setSelectedLocation(null);
      
    }
  }

  function handleDelete(path){
    setPaths((prevPaths) => prevPaths.filter((i) => i !== path));
  }

  async function saveLocation(){
    if (!currentLocation){
      const node = new location(locationName,locationDescription)
      node.paths = paths
      await addLocation(node)
      setCurrentLocation(node)
      
    }else{
      currentLocation.name = locationName
      currentLocation.label = locationName
      currentLocation.description = locationDescription
      currentLocation.paths = paths
      await updateLocations()  
    }
  }

  async function saveAdventure(){
    if (currentAdventure._id){
      const res = await axios.patch(`${url}/adventures/${currentAdventure._id}`,currentAdventure)
      handleCurrentAdventure(res.data)
      setLocations(currentAdventure.locations)
    }else{
      const res = await axios.post(`${url}/adventures`,currentAdventure)
      handleCurrentAdventure(res.data)
      setLocations(currentAdventure.locations)
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

  useEffect(()=>{
    updateAdventure(locations)
  },[locations])

  //RETURN
  return (
      <>
        <Box sx={{display:'flex', flexDirection:'column', alignContent: 'center', justifyContent: 'center'}}>
          <Box sx={{display:'flex', justifyContent: 'space-between'}}>
            <Typography variant="h2">Location</Typography>
            <Button variant='contained' onClick={()=>{handleBuilderPage("testGame")}}>Play</Button>
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
          <IconButton aria-label="delete" size="large" onClick={()=>{}}>
          <DeleteIcon fontSize="xl" />
          </IconButton>
        </Box>
        {/* Display the paths */}
          {paths.map((path, index) => (
            <Path key={index} path={path} handleDelete={handleDelete} paths={paths}/>
          ))}
        <Button variant='outline' onClick={saveLocation}>Save Location</Button>
        <Button variant='outline' onClick={saveAdventure}>Save Adventure</Button>
        <Locations locations={locations} handleSetLocation={handleSetLocation}/>
      </>
  );
}


