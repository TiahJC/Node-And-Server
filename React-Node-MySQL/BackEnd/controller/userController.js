const User = require("../models/queryHelpers")
const bcrypt = require("bcrypt")
const saltRound = 10

exports.findUser = (req, res) => {
  console.log("the controller", req)
  User.getUser(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error",
      })
    } else {
      res.send(data)
    }
  })
}

exports.AddUser = (req, res) => {
  const duplicates = false
  console.log("the controller", req.body) //req.params
  User.addUser(req, (err, data) => {
    if (err) {
      res.send({
        message: err.message || "Some error",
      })
    } else {
      res.send(data)
    }
  })
}

exports.PasswordUser = async (req, res) => {
  console.log("controller", req.body)
  req.body.password = await bcrypt.hash(req.body.password, saltRound)
  User.updateUserpassword(req, (err, data) => {
    if (err) {
      res.send({
        message: err.message || "Some error",
        result: false,
      })
    } else {
      console.log("the data is", data)
      res.send(data)
    }
  })
}

exports.EmailUser = (req, res) => {
  console.log("the Controller for Updating Email", req.body.username)
  User.updateUseremail(req, (err, data) => {
    if (err) {
      res.send({
        message: err.message || "Some error",
      })
    } else {
      res.send(data)
    }
  })
}

exports.CheckUserLoggingin = (req, res) => {
  console.log("Controller for checking loggingqweq", req.body.username, req.body.email)
  console.log("HIT")
  User.checkLoggin(req, (data) => {
    // if (err) {
    //   res.send({
    //     message: err.message || "Some error",
    //   })
    // } else {
    console.log("controller", data)
    res.send(data)
    // }
  })
}

exports.AddGroup = (req, res) => {
  User.addgrp(req, (err, data) => {
    if (err) {
      res.send({ message: err.message || "Some error" })
    } else {
      res.send(data)
    }
  })
}

exports.GrabAllGroup = (req, res) => {
  User.graballgrp(req, (err, data) => {
    if (err) {
      res.send({ message: err.message || "Some error" })
    } else {
      res.send(data)
    }
  })
}

exports.GrabAllUsers = (req, res) => {
  User.graballuser(req, (err, data) => {
    if (err) {
      res.send({ message: err.message || "Some error" })
    } else {
      res.send(data)
    }
  })
}
exports.Grpstatus = (req, res) => {
  User.grpstatus(req, (err, data) => {
    console.log(req)
    if (err) {
      res.send({ message: err.message || "Some error" })
    } else {
      res.send(data)
    }
  })
}

exports.GrabUserInfos = (req, res) => {
  console.log(req.params.username)
  User.grabUserInfos(req, (err, data) => {
    console.log(req)
    if (err) {
      // res.send({ message: err.message || "Some error" })
    } else {
      //console.log(data)
      res.send(data)
    }
  })
}

exports.EditUser = (req, res) => {
  //console.log(req.body)
  User.EditUserInfos(req, (err, data) => {
    console.log(req)
    if (err) {
      // res.send({ message: err.message || "Some error" })
    } else {
      //console.log(data)
      res.send(data)
    }
  })
}
exports.CreateApp = (req, res) => {
  console.log(req.body)
  if (req.body.appAcronym !== null) {
    User.CreateApp(req, (data) => {
      res.send(data)
    })
  }
}
exports.Graballapplication = (req, res) => {
  console.log("requesting for application table")
  User.graballapplication(req, (data) => {
    //console.log("hello", data)
    res.send(data)
  })
}
exports.grabAppInfos = (req, res) => {
  console.log("requesting for individual application", req.params.acronym)
  User.grabAppInfos(req, (data) => {
    //console.log("hello", data)
    res.send(data)
  })
}
exports.EditApp = (req, res) => {
  console.log("requesting for individual application", req.body.appdes)
  User.EditApp(req, (data) => {
    //console.log("hello", data)
    res.send(data)
  })
}
exports.CreatePlan = (req, res) => {
  //console.log("Creating Plan", req.body)
  User.CreatePlan(req, (data) => {
    //console.log("hello", data)
    res.send(data)
  })
}

exports.grabPlanInfos = (req, res) => {
  //console.log("Creating Plan", req.body)
  User.grabPlanInfos(req, (data) => {
    //console.log("hello", data)
    res.send(data)
  })
}

exports.grabsinglePlanInfos = (req, res) => {
  //console.log("Creating Plan", req.body)
  User.grabsinglePlanInfos(req, (data) => {
    //console.log("hello", data)
    res.send(data)
  })
}
exports.EditPlan = (req, res) => {
  //console.log("Creating Plan", req.body)
  User.EditPlan(req, (data) => {
    //console.log("hello", data)
    res.send(data)
  })
}
exports.CreateTask = (req, res) => {
  //console.log("Creating Plan", req.body)
  User.CreateTask(req, (data) => {
    User.RnumIncrement(req)
    //console.log("hello", data)
    res.send(data)
  })
}
exports.GrabTask = (req, res) => {
  //console.log("Creating Plan", req.body)

  User.GrabTask(req, (data) => {
    //console.log("hello", data)
    res.send(data)
  })
}
exports.handlestatechange = (req, res) => {
  //console.log("Creating Plan", req.body)
  User.handlestatechange(req, (data) => {
    res.send(data)
  })
}

exports.EditTask = (req, res) => {
  //console.log("Creating Plan", req.body)
  User.EditTask(req, (data) => {
    res.send(data)
  })
}
exports.grabtask = (req, res) => {
  //console.log("Creating Plan", req.body)
  User.grabtask(req, (data) => {
    res.send(data)
  })
}
