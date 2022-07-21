const { JsonWebTokenError } = require("jsonwebtoken")
const getConnection = require("../models/db")

exports.checkDuplicates = async (req, respond, next) => {
  connection = getConnection()
  console.log("hit", req.body.username)
  connection.query("select * from account where username = ?", [req.body.username], (err, results) => {
    console.log(results)
    if (err) {
      console.log("error", err)
      throw err
    }
    if (results.length > 0) {
      respond.send({ message: "Please Enter Other Username" })
      console.log("user duplicated")
      return
    } else {
      console.log("clear middleware")
      next()
    }
  })
}

exports.verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"]
  if (!token) {
    res.send("No Token")
  } else {
    jwt.verify(token, "PineappleshittyChickenGrilled", (err, decoded) => {
      if (err) {
        res.json({ message: "Wrong Authentication" })
      } else {
        req.userAuth = decoded.username
        next()
      }
    })
  }
}

exports.checkDuplicatesgroup = async (req, respond, next) => {
  connection = getConnection()
  console.log("hit", req.body.username)
  connection.query("select * from grps where grp = ?", [req.body.group], (err, results) => {
    console.log(results)
    if (err) {
      console.log("error", err)
      throw err
    }
    if (results.length > 0) {
      respond.send({ message: "Please Enter Other Group Name" })
      console.log("group duplicated")
      return
    } else {
      console.log("clear middleware")
      next()
    }
  })
}
exports.addTaskAcronym = async (req, respond, next) => {
  connection = getConnection()
  console.log("middle", req.body)
}
exports.checkDuplicatesapp = async (req, respond, next) => {
  connection = getConnection()
  console.log("hit", req.body.username)
  if (req.body !== "" && req.body.appAcronym !== "") {
    connection.query("select * from application where App_acronym = ?", [req.body.appAcronym], (err, results) => {
      console.log(results)
      if (err) {
        console.log("error", err)
        throw err
      }
      if (results.length > 0) {
        respond.send({ message: "Please Enter Other Application" })
        console.log("group duplicated")
        return
      } else {
        console.log("clear middleware")
        next()
      }
    })
  } else {
    respond.send({ message: "Please Enter Required Field App's Acronym" })
  }
}
exports.checkDuplicatesplan = async (req, respond, next) => {
  connection = getConnection()
  console.log("hit", req.body.username)
  if (req.body !== "" && req.body.mvpName !== "") {
    connection.query("select * from plan where Plan_MVP_name = ?", [req.body.mvpName], (err, results) => {
      console.log(results)
      if (err) {
        console.log("error", err)
        throw err
      }
      if (results.length > 0) {
        respond.send({ message: "Please Enter Other Plan Name" })
        console.log("group duplicated")
        return
      } else {
        console.log("clear middleware")
        next()
      }
    })
  }
}
exports.checkDuplicatestask = async (req, respond, next) => {
  connection = getConnection()
  console.log("hit", req.body.username)
  if (req.body !== "" && req.body.taskName !== "") {
    connection.query("select * from task where Task_id = ?", [req.body.taskid], (err, results) => {
      console.log(results)
      if (err) {
        console.log("error", err)
        throw err
      }
      if (results.length > 0) {
        respond.send({ message: "Please Enter Other Task Name" })
        console.log("group duplicated")
        return
      } else {
        console.log("clear middleware")
        next()
      }
    })
  }
}
