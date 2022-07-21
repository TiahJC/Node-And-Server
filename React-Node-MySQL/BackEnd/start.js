const express = require("express")
const getConnection = require("./models/db")
connect = getConnection()
//--------------db connected-----------//
const app = express()
const cors = require("cors")

var corsOptions = {
  //origin: "http://localhost:8000",
  credential: true,
  optionSuccessStatus: 200,
}

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//const route = require("./router")
require("./router")(app)
//const apiRouter = require("./router")
app.listen(8000, () => {
  console.log("server is running on 3000")
})
