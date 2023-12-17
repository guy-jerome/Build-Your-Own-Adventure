import {useState} from "react"

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';


export default function Game({locations}){
    const [playerLocation, setPlayerLocation] = useState(locations[0])

    function changeLocation(location){
        setPlayerLocation(locations[locations.indexOf(location)])
    }
    return(
        <Box sx={{bgcolor:"darkcyan", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <Box sx={{display:'flex', justifyContent: 'space-between'}}>
                <Typography variant="h2">{playerLocation.name}</Typography>
                <Button variant='contained' onClick={()=>{changeMode("create")}}>Edit</Button>
            </Box>
            <Typography>{playerLocation.description}</Typography>
            <Box>
                {
                    // eslint-disable-next-line react/prop-types
                    playerLocation.paths.map((path)=>{
                        return <Option path={path} changeLocation={changeLocation} />
                    })
                }
            </Box>
        </Box>
    )
}

function Option({path, changeLocation}){
    return(
        <Box>
            <Typography>{path.location.name}</Typography>
            <Button onClick={()=>{changeLocation(path.location)}}>{path.description}</Button>
        </Box>
    )
}
