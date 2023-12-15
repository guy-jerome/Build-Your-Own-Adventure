import {useState} from "react"

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import Option from './Option.jsx';

export default function Game({locations, changeMode}){
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