import { useState } from "react";

import { Box, Button, Container, InputLabel, TextField, Typography } from "@mui/material";
import Adventure from "./Adventure.jsx";
import LocationBuilder from "./LocationBuilder.jsx"
import Game from "../Game/Game.jsx"
import Banner from "../Banner/Banner.jsx"
export default function AdventureBuilder({currentAdventure, handleCurrentAdventure, updateAdventure}){
    //Can be adventure/location/testGame
    const [builderPage, setBuilderPage] = useState("adventure")

    function handleBuilderPage(page){
      setBuilderPage(page)
    }

    function checkBuilderPage(){
        switch(builderPage){
          case "adventure":
            return <Adventure handleCurrentAdventure={handleCurrentAdventure}  handleBuilderPage={handleBuilderPage}/>
          case "location":
            return <LocationBuilder currentAdventure={currentAdventure} handleBuilderPage={handleBuilderPage} handleCurrentAdventure={handleCurrentAdventure} updateAdventure={updateAdventure}/>
          case "testGame":
            return <Game currentAdventure={currentAdventure} handleCurrentAdventure={handleCurrentAdventure} handleBuilderPage={handleBuilderPage}/>
          default:
            console.error("No Valid Builder Page Selected")
        }
    }

    return(
      <Container maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "accent.main",
      }}>
        <Banner/>
        {checkBuilderPage()}
      </Container> 
    )
}