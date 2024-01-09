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
    }
    checkMapFree(location){
        if(this.locations.length > 0){
            console.log(this.locations.length)
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

class Location{
    constructor(x,y){
        this.x = x
        this.y = y
    }
}

let map = new Map(8)
map.populateMap(6)
map.printMap()