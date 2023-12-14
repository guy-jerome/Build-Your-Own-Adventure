import { useState } from "react";

import LocationCreate from "./LocationCreate"
import Container from '@mui/material/Container'
import Button from '@mui/material/Button';

import Locations from "./Locations";
import location from "./location.js";
import Game from "./Game.jsx";



export default function App(){

  const farmHouse = new location("Farm House","A small farm house." )

  const gardenPath = new location("Garden Path", "A quaint garden path.")
  const riverBank = new location("River Bank", "A small river bank.")
  farmHouse.paths = [gardenPath, riverBank]
  const [locations, setLocations] = useState([farmHouse, gardenPath, riverBank])

  function addLocation(location){
    setLocations([...locations, location])
  }

  function updateLocations(){
    setLocations([...locations])
  }


  return(
    <Container sx={{display:'flex', flexDirection:'column', alignContent: 'center', justifyContent: 'center'}}>
      <LocationCreate locations={locations} addLocation={addLocation} updateLocations={updateLocations}/>
      <Locations locations={locations}/>
      <Game locations = {locations}/>
    </Container>
  )

}