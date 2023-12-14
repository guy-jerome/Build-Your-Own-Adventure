import {useState} from "react"

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import Option from './Option.jsx';

export default function Game({locations}){
    const [playerLocation, setPlayerLocation] = useState(locations[0])

    function changeLocation(location){
        setPlayerLocation(locations[locations.indexOf(location)])
    }
    return(
        <Box sx={{bgcolor:"darkcyan"}}>
            <Typography>{playerLocation.name}</Typography>
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