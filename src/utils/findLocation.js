export default function findLocation(locations,path){
  const location = locations.filter((location)=>{
    return location.name === path.name
  })
  console.log(location)
}