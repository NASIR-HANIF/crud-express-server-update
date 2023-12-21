require("dotenv").config();
const express = require("express");
const app = express();
const db =  require("./db/conn")
const cors = require("cors")
const PORT = process.env.PORT || 8080
const router = require("./routes/router")

app.use(cors())
app.use(express.json())
app.use(router)


app.get("/",(req,res)=>{
    res.status(200).json({message:"good job"})
})

//Routes go here
app.all('*', (req,res) => {
    res.status(404)
    res.json({"every thing":"is awesome page not Found"})
})

//Connect to the database before listening
db.connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests database already conneted");
    })
})
