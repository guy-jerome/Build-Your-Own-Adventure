export default class Location{
  constructor(name,description){
    this.name = name
    this.label = name
    this.description = description
    this.paths = []
  }
  addPath(path,pathDescription){
    this.paths.push({path,pathDescription})
  }
}