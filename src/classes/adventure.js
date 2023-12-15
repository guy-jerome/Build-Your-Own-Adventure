export default class Adventure{
    constructor(name,description, userId=1){
        this.name = name
        this.description = description
        this.userId = userId
        this.locations = []
    }
}