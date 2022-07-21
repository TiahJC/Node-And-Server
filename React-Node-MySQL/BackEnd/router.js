module.exports = (apiRouter) => {
  //import LoggedOutPage from "./views/login"
  const express = require("express")
  //const { addUser, getUser } = require("./utils/queryHelpers")
  const app = express()
  const { response } = require("express")
  const users = require("./controller/userController")
  const middle = require("./controller/middleware")
  const cors = require("cors")
  const jwt = require("jsonwebtoken")

  apiRouter.use(cors())
  apiRouter.use(express.json())
  // // --------------- Front End Calling -----------------------//
  //apiRouter.get("/", (req, res) => res.json("Hello, if you see this message that means your backend is up and running successfully. Congrats! Now let's continue learning React!"))
  apiRouter.post("/login", users.CheckUserLoggingin)
  //apiRouter.post("/")
  apiRouter.post("/createuser", [middle.checkDuplicates], users.AddUser) // Add User Registration
  apiRouter.get("/finduser", users.findUser) //Get User Information
  apiRouter.put("/editpassword", users.PasswordUser) //Update User Password
  apiRouter.put("/editemail", users.EmailUser) // Update User Email
  apiRouter.put("/updategrpstatus", users.Grpstatus) // Update User Email
  apiRouter.post("/creategroup", [middle.checkDuplicatesgroup], users.AddGroup) // Add Group Registration
  apiRouter.get("/graballgroup", users.GrabAllGroup) // Grab ALL Group for Selections
  apiRouter.get("/graballuser", users.GrabAllUsers)
  apiRouter.get("/grabuserinfos/:username", users.GrabUserInfos)
  apiRouter.put("/edituser", users.EditUser)
  apiRouter.post("/createapp", [middle.checkDuplicatesapp], users.CreateApp)
  apiRouter.get("/graballapplication", users.Graballapplication)
  apiRouter.get("/grabappinfos/:acronym", users.grabAppInfos)
  apiRouter.put("/editapp", users.EditApp)
  apiRouter.post("/createplan", [middle.checkDuplicatesplan], users.CreatePlan)
  apiRouter.get("/graballplan/:acronym/:group", users.grabPlanInfos)
  apiRouter.get("/graballplanfortask", users.grabPlanInfos)
  apiRouter.get("/grabplaninfos/:mvpName", users.grabsinglePlanInfos)
  apiRouter.get("/editplan", users.EditPlan)
  apiRouter.post("/createtask", [middle.checkDuplicatestask], users.CreateTask)
  apiRouter.get("/grabtask/:acronym/:state", users.GrabTask)
  apiRouter.post("/handlestatechange", users.handlestatechange)
  apiRouter.post("/edittask", users.EditTask)
  apiRouter.get("/grabtask/:taskid", users.grabtask)
  //apiRouter.get("/createtask", [middle.addTaskAcronym], users.CreateTask)
  // //-----------------//--------------------------//
  //app.listen(8001)
}
