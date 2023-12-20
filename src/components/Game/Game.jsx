import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import findLocation from "../../utils/findLocation";
import { useNavigate } from "react-router-dom";
import Banner from "../Banner/Banner.jsx"
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
    <Container >
    <Banner/>
    <Box
      sx={{
        bgcolor: "accent.main",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height:"100vh"
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h3">{currentAdventure.name}</Typography>
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
      <Typography variant="h5">Current Location:</Typography>
      <Box sx={{border:3, pr:5,pl:5,pt:1,pb:5, width:"80%", textAlign:"center"}}>
        <Typography variant="h6">{playerLocation.name}</Typography>
        <Typography variant="p">{playerLocation.description}</Typography>
      </Box>
      <Typography>Pick from one of these Options:</Typography>
      <Box sx={{border:4, p:3, m:1}}>
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
    </Container>
  );
}

function Option({ path, changeLocation, locations }) {
  return (
    <Box>
      <Button variant="contained" onClick={() => changeLocation(findLocation(locations, path))}>
        {path.description}
      </Button>
    </Box>
  );
}
