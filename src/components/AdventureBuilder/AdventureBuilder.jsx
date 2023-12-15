import { useState } from "react";

import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import Adventure from "./Adventure.jsx";
import LocationBuilder from "./LocationBuilder.jsx"

export default function AdventureBuilder(){
    //Can be adventure/location/testGame
    const [builderPage, setBuilderPage] = useState("adventure")
    const [currentAdventure, setCurrentAdventure] = useState(null)

    function handleCurrentAdventure(adventure){
      setCurrentAdventure
    }

    function handleBuilderPage(page){
      setBuilderPage(page)
    }

    function checkBuilderPage(){
        switch(builderPage){
          case "adventure":
            return <Adventure handleCurrentAdventure={handleCurrentAdventure}  handleBuilderPage={handleBuilderPage}/>
          case "location":
            return <LocationBuilder/>
          case "testGame":
            return <Game/>
          default:
            console.error("No Valid Builder Page Selected")
        }
    }

    return(
        checkBuilderPage()
    )
}