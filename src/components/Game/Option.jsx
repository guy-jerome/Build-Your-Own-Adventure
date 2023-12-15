import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
export default function Option({path, changeLocation}){
    return(
        <Box>
            <Typography>{path.location.name}</Typography>
            <Button onClick={()=>{changeLocation(path.location)}}>{path.description}</Button>
        </Box>
    )
}
