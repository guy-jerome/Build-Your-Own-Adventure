import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'
import Typography from '@mui/material/Typography'
import { Autocomplete, Grid, InputLabel, MenuItem, Paper, Select, TextField} from '@mui/material';
export default function Path({ pathName, handleDelete }) {


  return (
    <div>
      <Typography variant='h3'>{pathName}</Typography>
      <InputLabel htmlFor="path-description">Path Description</InputLabel>
      <TextField id="path-description"></TextField>
      <IconButton aria-label="delete" size="large" onClick={()=>{handleDelete(pathName)}}>
        <DeleteIcon fontSize="large" />
      </IconButton>
    </div>
  );
}