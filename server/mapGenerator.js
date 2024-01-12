import random from "random-js"

class Map{
    constructor(size){
        this.size = size
        this.locations = [];
    }
    populateMap(locationNum){
        for(let i = 0; i < locationNum; i++){
            let added = false
            let location;
            while (!added){
                location = new Location(this.getRandomInt(this.size),this.getRandomInt(this.size))
                added = this.checkMapFree(location)
            }
            this.locations.push(location)
            
        }
        const maxCount = 4;
        for (let i = 0; i < this.locations.length; i++) {
            const numClosest = this.getRandomInt(maxCount) + 1;
            this.locations[i].updateClosest(this.locations, numClosest);
        }
    }
    checkMapFree(location){
        if(this.locations.length > 0){
            this.locations.forEach((other)=>{
                if (this.checkFreeLocation(location,other) === false){
                    return false
                }
            })
        }
        return true
    }
    checkFreeLocation(location,other){
        return location.x === other.x && location.y === other.y?false:true
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    printMap(){
        console.log(this.locations)
    }

}

class Location {
    constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.name = name
        this.closestLocations = [];
    }

    updateClosest(allLocations, maxCount) {
        const distances = allLocations.map(other => {
            if (other === this) {
                return null; // Skip calculating distance to itself
            }
            const dx = this.x - other.x;
            const dy = this.y - other.y;
            return Math.sqrt(dx * dx + dy * dy);
        });

        // Find indices of the closest locations
        const closestIndices = distances.reduce((acc, dist, index) => {
            if (dist !== null) {
                if (acc.length < maxCount) {
                    acc.push(index);
                } else {
                    const maxDistInAcc = Math.max(...acc.map(i => distances[i]));
                    if (dist < maxDistInAcc) {
                        acc[acc.indexOf(maxDistInAcc)] = index;
                    }
                }
            }
            return acc;
        }, []);

        // Store the actual Location objects
        this.closestLocations = closestIndices.map(index => [allLocations[index].x, allLocations[index].y]);
    }
}


function randomLocationName(locations) {
    /**
     * Randomly selects a location name from an array of locations, considering three types: 
     * essential unique, notEssential unique, and notEssential notUnique.
     *
     * Args:
     *     locations: An array of dictionaries representing locations, with keys "type" (string) 
     *                and "name" (string).
     *
     * Returns:
     *     The name of a randomly selected location.
     */

    // Categorize locations by type
    const essentialUnique = locations.filter(loc => loc.type === "essential unique");
    const notEssentialUnique = locations.filter(loc => loc.type === "notEssential unique");
    const notEssentialNotUnique = locations.filter(loc => loc.type === "notEssential notUnique");

    // Set weights for each category (adjust these based on your desired probabilities)
    const weights = [1, 2, 3]; // Essential: 1, notEssentialUnique: 2, notEssentialNotUnique: 3

    // Calculate cumulative probabilities
    const cumulativeProbs = [];
    let cumulativeSum = 0;
    for (const weight of weights) {
        cumulativeSum += weight;
        cumulativeProbs.push(cumulativeSum);
    }

    // Randomly select a category based on weights
    const randomValue = Math.random() * cumulativeSum;
    let selectedCategory;
    for (let i = 0; i < cumulativeProbs.length; i++) {
        if (randomValue <= cumulativeProbs[i]) {
            selectedCategory = [essentialUnique, notEssentialUnique, notEssentialNotUnique][i];
            break;
        }
    }

    // Choose a random location from the selected category
    const randomIndex = Math.floor(Math.random() * selectedCategory.length);
    return selectedCategory[randomIndex].name;
}


  const locations = [
    { type: "essential unique", name: "Central Park" },
    { type: "notEssential unique", name: "Times Square" },
    { type: "notEssential unique", name: "Brooklyn Bridge" },
    { type: "notEssential notUnique", name: "Coffee Shop" },
    { type: "notEssential notUnique", name: "Restaurant" },
    { type: "notEssential notUnique", name: "Park" },
  ];
  
  // Get a random location name
  const selectedLocation = randomLocationName(locations);
  console.log(selectedLocation)
// let map = new Map(20)
// map.populateMap(6)
// console.log(map.locations[0])