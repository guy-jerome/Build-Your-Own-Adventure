import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import findLocation from "../../utils/findLocation";
import { useNavigate } from "react-router-dom";

export default function Game({ currentAdventure, handleBuilderPage }) {
  const navigate = useNavigate();
  const [playerLocation, setPlayerLocation] = useState(
    currentAdventure.locations[0]
  );

  const changeLocation = (location) => {
    setPlayerLocation(
      currentAdventure.locations[currentAdventure.locations.indexOf(location)]
    );
  };

  return (
    <Box
      sx={{
        bgcolor: "darkcyan",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h2">{playerLocation.name}</Typography>
        {handleBuilderPage ? (
          <Button
            variant="contained"
            onClick={() => handleBuilderPage("location")}
          >
            Edit
          </Button>
        ) : (
          <Button onClick={() => navigate("/")}>Exit</Button>
        )}
      </Box>
      <Typography>{playerLocation.description}</Typography>
      <Box>
        {playerLocation.paths.map((path) => (
          <Option
            key={path.location.name}
            path={path}
            changeLocation={changeLocation}
            locations={currentAdventure.locations}
          />
        ))}
      </Box>
    </Box>
  );
}

function Option({ path, changeLocation, locations }) {
  return (
    <Box>
      <Typography>{path.location.name}</Typography>
      <Button onClick={() => changeLocation(findLocation(locations, path))}>
        {path.description}
      </Button>
    </Box>
  );
}
