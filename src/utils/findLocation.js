import Adventure from "../classes/adventure.js"
import Location from "../classes/location.js"
import Path from "../classes/path.js"


export default function findLocation(locations,path){
  const location = locations.find((location)=>{
    return location.name === path.location
  })
  return location
}

  //TEST DATA
  // const adventure = new Adventure("Huge Adventure", "POOP")
  // const farmHouse = new Location("Farm House","A small farm house." )
  // const gardenPath = new Location("Garden Path", "A quaint garden path.")
  // const riverBank = new Location("River Bank", "A small river bank.")
  // const gardenP = new Path("Garden Path","A small path leads down to a small garden.")
  // const riverP = new Path("River Bank","A small path leads down the road towards a river.")
  // farmHouse.paths = [gardenP,riverP]
  // const locations = [farmHouse,gardenPath,riverBank]
  // adventure.locations = locations


