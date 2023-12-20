import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Autocomplete, InputLabel, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Path from './Path.jsx';
import location from "../../classes/location.js";
import path from "../../classes/path.js";
import findLocation from '../../utils/findLocation.js';
import Locations from './Locations.jsx';
import { LocationSearching } from '@mui/icons-material';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function LocationCreate({ currentAdventure, updateAdventure, handleBuilderPage, handleCurrentAdventure }) {
  const { user, updateUser, url } = useContext(UserContext);
  const [locations, setLocations] = useState(currentAdventure.locations ? currentAdventure.locations : []);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [paths, setPaths] = useState([]);
  const [locationName, setLocationName] = useState("");
  const [locationDescription, setLocationDescription] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);

  async function addLocation(location) {
    await setLocations([...locations, location]);
  }

  async function updateLocations() {
    await setLocations([...locations]);
  }

  function handleAddPath() {
    if (selectedLocation) {
      setPaths(prevPaths => [...prevPaths, new path(selectedLocation.name)]);
      setSelectedLocation(null);
    }
  }

  function handleDelete(path) {
    setPaths(prevPaths => prevPaths.filter(i => i !== path));
  }

  function handleDeleteLocation() {
    setLocations(locations.filter(location => (location !== currentLocation)));
    handleNew();
  }

  async function saveLocation() {
    if (!currentLocation) {
      const node = new location(locationName, locationDescription);
      node.paths = paths;
      await addLocation(node);
      setCurrentLocation(node);
    } else {
      currentLocation.name = locationName;
      currentLocation.label = locationName;
      currentLocation.description = locationDescription;
      currentLocation.paths = paths;
      await updateLocations();
    }
  }

  async function saveAdventure() {
    if (currentAdventure._id) {
      const res = await axios.patch(`${url}/adventures/${currentAdventure._id}`, currentAdventure);
      handleCurrentAdventure(res.data);
      setLocations(currentAdventure.locations);
    } else {
      const res = await axios.post(`${url}/adventures`, currentAdventure);
      handleCurrentAdventure(res.data);
      setLocations(currentAdventure.locations);
    }
  }

  function handleNew() {
    setCurrentLocation(null);
    setLocationDescription("");
    setLocationName("");
    setPaths([]);
  }

  function handleSetLocation(location) {
    setCurrentLocation(location);
    setPaths(location.paths);
    setLocationName(location.name);
    setLocationDescription(location.description);
  }

  useEffect(() => {
    updateAdventure(locations);
  }, [locations]);

  return (
    <Box sx={{ backgroundColor: "accent.main" }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4">Location:</Typography>
          {currentAdventure._id && <Button variant='contained' onClick={() => { handleBuilderPage("testGame") }}>Play</Button>}
        </Box>
        <InputLabel htmlFor="location-name">Name</InputLabel>
        <TextField id="location-name" value={locationName} onChange={(e) => { setLocationName(e.target.value) }}></TextField>
        <InputLabel htmlFor="location-description">Description</InputLabel>
        <TextField id="location-description" value={locationDescription} onChange={(e) => { setLocationDescription(e.target.value) }}></TextField>
        <Typography variant='h5'>Create a Path:</Typography>
        <Autocomplete
          disablePortal
          id="locations"
          options={locations}
          value={selectedLocation}
          onChange={(event, newValue) => setSelectedLocation(newValue)}
          renderInput={(params) => <TextField {...params} label="Locations" />}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant='contained' onClick={handleAddPath} sx={{ width: 124 }}>Add Path</Button>
          <Button variant='contained' onClick={handleNew} sx={{ width: 124 }}>New Location</Button>
          <IconButton aria-label="delete" size="large" sx={{ width: 124 }} onClick={handleDeleteLocation}>
            <DeleteIcon fontSize="xl" />
          </IconButton>
        </Box>
        <Typography variant='h6'>Paths:</Typography>
        <Box sx={{ border: 2, borderRadius: 2, display: "flex", flexWrap: "wrap", p: 1 }}>
        {paths.map((path, index) => (
          <Path key={index} path={path} handleDelete={handleDelete} paths={paths} />
        ))}
      </Box>
      <Button variant='contained' sx={{ width: "30%" }} onClick={saveLocation}>Save Location</Button>
      <Button variant='contained' sx={{ width: "30%" }} onClick={saveAdventure}>Save Adventure</Button>
      <Typography variant='h4'>Locations:</Typography>
      <Locations locations={locations} handleSetLocation={handleSetLocation} />
      </Box>

    </Box>
  );
}
