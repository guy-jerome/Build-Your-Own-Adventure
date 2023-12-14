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
  farmHouse.paths = [{location:gardenPath, description:"A small Clearing in the woods"}, {location:riverBank, description:"A path leading down the river"}]

  const [locations, setLocations] = useState([farmHouse, gardenPath, riverBank])
  const [gameState, setGameState] = useState("create")
  function addLocation(location){
    setLocations([...locations, location])
  }

  function updateLocations(){
    setLocations([...locations])
  }

  function checkGameState(){
    switch(gameState){
      case "create":
        return <LocationCreate locations={locations} addLocation={addLocation} updateLocations={updateLocations}/>
      case "play":
        return <Game locations={locations}/>
      default:
        console.error("No Game State Selected")
    }
  }


  return(
    <Container sx={{display:'flex', flexDirection:'column', alignContent: 'center', justifyContent: 'center'}}>
      {
        checkGameState()
      }
    </Container>
  )

}