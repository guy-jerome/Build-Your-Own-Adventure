import express from "express"

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

app.get("/api/user",(req,res)=>{
  
})

app.get("/api/user/:id", (req,res)=>{

})

app.post('/api/user',(req,res)=>{

})

app.get("/api/adventure", (req,res)=>{
  
})

app.get("/api/adventure/:id", (req,res)=>{

})

app.post("/api/adventure", (req,res)=>{
  
})


app.listen(port, ()=>{
  console.log("Express Server Running on Port:", port)
})