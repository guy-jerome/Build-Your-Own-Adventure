import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
export default function Option({path}){
    return(
        <Box>
            <Button>{path.name}</Button>
        </Box>
    )
}
