import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import axios from "axios";

export default function Adventures({currentAdventure, handleCurrentAdventure}) {
  const { url } = useContext(UserContext);
  const [adventures, setAdventures] = useState(null);

  useEffect(() => {
    async function getAdventures() {
      try {
        const results = await axios.get(`${url}/adventures`);
        console.log(results.data);
        setAdventures(results.data);
      } catch (error) {
        console.error("Error fetching adventures:", error);
      }
    }
    getAdventures();
  }, [url]);

  return (
    <Box>
      {adventures ? (
        adventures.map((adventure) => (
          <Button key={adventure.id} onClick={()=>{handleCurrentAdventure(adventure)}}>{adventure.name}</Button>
        ))
      ) : (
        'Loading...'
      )}
    </Box>
  );
}
