import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'
import Typography from '@mui/material/Typography'
import { InputLabel, TextField} from '@mui/material';

export default function Path({ path, handleDelete }) {

  return (
    <div>
      <Typography variant='h3'>{path.name}</Typography>
      <InputLabel htmlFor="path-description">Path Description</InputLabel>
      <TextField id="path-description"></TextField>
      <IconButton aria-label="delete" size="large" onClick={()=>{handleDelete(path)}}>
        <DeleteIcon fontSize="large" />
      </IconButton>
    </div>
  );
}