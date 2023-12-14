import { Button } from "@mui/material"
import Location from "./Location.jsx"

export default function Locations({locations, handleSetLocation}){
  return(
    <>
      {
        locations.map((location)=>(
          <Location location = {location} handleSetLocation={handleSetLocation}/>
        ))
      }
    </>

  )
}