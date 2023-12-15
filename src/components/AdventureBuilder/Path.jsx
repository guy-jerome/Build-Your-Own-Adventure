import {useState} from 'react'

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'
import Typography from '@mui/material/Typography'
import { InputLabel, TextField} from '@mui/material';

export default function Path({ path, handleDelete }) {

  const [description, setDescription] = useState(path.description)

  function handleChange(e){
    const newDescription = e.target.value;
    setDescription(newDescription);
    path.description = newDescription; 
  }

  return (
    <div>
      <Typography variant='h6'>{path.location.name}</Typography>
      <InputLabel htmlFor="path-description">Path Description</InputLabel>
      <TextField id="path-description" value={description} onChange={handleChange}></TextField>
      <IconButton aria-label="delete" size="large" onClick={()=>{handleDelete(path)}}>
        <DeleteIcon fontSize="large" />
      </IconButton>
    </div>
  );
}