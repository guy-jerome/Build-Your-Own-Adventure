import {useState} from "react"

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import Option from './Option.jsx';

export default function Game({locations}){
    const [playerLocation, setPlayerLocation] = useState(locations[0])
    return(
        <Box>
            <Typography>{playerLocation.name}</Typography>
            <Typography>{playerLocation.description}</Typography>
            <Box>
                {
                    // eslint-disable-next-line react/prop-types
                    playerLocation.paths.map((path)=>{
                        return <Option path={path}/>
                    })
                }
            </Box>
        </Box>
    )

}