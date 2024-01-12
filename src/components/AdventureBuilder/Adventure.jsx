import React, { useState } from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import location from "../../classes/location.js";
import adventure from "../../classes/adventure.js";
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function Adventure({ handleCurrentAdventure, handleBuilderPage }) {

  const {user} = useContext(UserContext)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(""); // State to store error message

  
  const handleStartCreating = () => {
    // Check if title and description are empty
    if (title.trim() === "") {
          setError("Please enter a title.");
          return;
        } 
    else if (description.trim() === "") {
          setError("Please provide a description.");
          return;
        }

    // Create the adventure and proceed as before
    const newAdventure = new adventure(title, description, user._id);
    handleCurrentAdventure(newAdventure);
    handleBuilderPage("location");
  };

  return (
    <Box sx={{height:"100vh"}}>
      <Typography variant="h4" gutterBottom>
        Adventure Setup
      </Typography>
      <Box>
        <InputLabel>Title</InputLabel>
        <TextField
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => {setError("");setTitle(e.target.value)}}
          error={!!error} // Show error state for title input
          helperText={error && "Title cannot be empty"}
        />
      </Box>
      <Box mt={2}>
        <InputLabel>Description</InputLabel>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={description}
          onChange={(e) => {setError("");setDescription(e.target.value)}}
          error={!!error} // Show error state for description input
          helperText={error && "Description cannot be empty"}
        />
      </Box>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleStartCreating} disabled={!!error}>
          Start Creating
        </Button>
      </Box>
    </Box>
  );
}