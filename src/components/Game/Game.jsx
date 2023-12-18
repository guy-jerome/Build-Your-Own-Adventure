import {useState} from "react"

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import findLocation from "../../utils/findLocation";

export default function Game({currentAdventure,handleCurrentAdventure, handleBuilderPage}){

    const [playerLocation, setPlayerLocation] = useState(currentAdventure.locations[0])

    function changeLocation(location){
        setPlayerLocation(currentAdventure.locations[currentAdventure.locations.indexOf(location)])
    }
    return(
        <Box sx={{bgcolor:"darkcyan", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <Box sx={{display:'flex', justifyContent: 'space-between'}}>
                <Typography variant="h2">{playerLocation.name}</Typography>
                <Button variant='contained' onClick={()=>{handleBuilderPage("location")}}>Edit</Button>
            </Box>
            <Typography>{playerLocation.description}</Typography>
            <Box>
                {
                    // eslint-disable-next-line react/prop-types
                    playerLocation.paths.map((path)=>{
                        return <Option path={path} changeLocation={changeLocation} locations = {currentAdventure.locations} />
                    })
                }
            </Box>
        </Box>
    )
}

function Option({path, changeLocation, locations}){
    return(
        <Box>
            <Typography>{path.location.name}</Typography>
            <Button onClick={()=>{changeLocation(findLocation(locations,path))}}>{path.description}</Button>
        </Box>
    )
}
