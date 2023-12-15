import React, { useState } from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import location from "../../classes/location.js";
import adventure from "../../classes/adventure.js";

export default function Adventure({ handleCurrentAdventure, handleBuilderPage}) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleStartCreating = () => {
    // Create an instance of the Adventure class with the provided title and description
    const newAdventure = new adventure(title, description);
    handleCurrentAdventure(newAdventure)
    handleBuilderPage("location")
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Adventure Setup
      </Typography>
      <Box>
        <InputLabel>Title</InputLabel>
        <TextField
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleStartCreating}>
          Start Creating
        </Button>
      </Box>
    </Box>
  );
}
