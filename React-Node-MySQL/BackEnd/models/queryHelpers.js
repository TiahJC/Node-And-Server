const { response, request } = require("express")
const getConnection = require("./db")
const bcrypt = require("bcrypt")
const saltRound = 10
const jwt = require("jsonwebtoken")
const CheckGroup = require("../controller/CheckGroup")
const checkProjectManager = require("../controller/CheckGroup")
//let password = ""
connection = getConnection()
const addUser = async (req, respond) => {
  console.log("HIT")

  console.log(req.body, "c")
  if (req.body.username && req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, saltRound)
    console.log(req.body.password, "password hash")
    console.log(req.body, "Cannot Reach here")
    let addinguserquery = `INSERT INTO account (username,email,password,grp,status) values ('${req.body.username}', '${req.body.email}', '${req.body.password}', '${req.body.selectedGroup}','${req.body.status}')`
    //return connection.query("INSERT INTO account (username,email,password) values (?,?,?)", [req.body.username, req.body.email, req.body.password])
    //return name, department, address
    connection.query(addinguserquery, (err, result) => {
      if (err) {
        throw err
      } else {
        respond(null, { message: "User Created" })
      }
    })
  } else {
    respond(null, { message: "Empty Username And/Or Password" })
  }
}
const getUser = async (req, respond) => {
  console.log("hi", req)

  console.log("HIT")
  let gettinguserquery = `select account.id , account.username, account.password, account.email from account where account.id ='${req}'`
  connection.query(gettinguserquery, (err, res) => {
    if (err) {
      console.log("err")
    }
    if (res.length) {
      console.log("found user")
      console.log("the retrieve data is", res[0])
      respond(null, res)
    } else {
      console.log("there no data ")
    }
  })
}

const updateUserpassword = (req, respond) => {
  connection.query("update account SET password = ? WHERE username = ?", [req.body.password, req.body.username], (err, results) => {
    console.log("the error", err)
    console.log("the results", results)
    if (err) {
      throw err
    }
    if (results) {
      respond(null, { message: "User Password Updated", result: true })
    }
  })
}

const updateUseremail = (req, respond) => {
  console.log("updating user", req.body.username, req.body.email)

  console.log("Database accessed for updating")
  connection.query("update account SET email = ? where username = ?", [req.body.email, req.body.username], (err, results) => {
    if (err) {
      throw err
    } else {
      respond(null, { message: "User Email Updated", result: results }) // meed to to testing query over here
    }
  })
}

const checkLoggin = (req, respond) => {
  console.log("Checking loggging data", req.body.username)

  console.log("Database accessed")
  if (req.body.username && req.body.password) {
    connection.query("select * from account where username = ?", [req.body.username], async (err, results) => {
      if (err) {
        throw err
      }

      if (results.length > 0) {
        if (results[0].status == "Disabled") {
          return respond({ message: "Invalid Log In", result: null })
        }
        //nreq.body.password = await bcrypt.hash(req.body.password, saltRound)
        console.log("User Verified", req.body.password, "Hello", results[0].password)
        const ifadmin = CheckGroup.checkGroup(results[0].username, results[0].grp)
        bcrypt.compare(req.body.password, results[0].password).then((res) => {
          console.log(res)
          if (res) {
            const username = results[0].username
            const token = jwt.sign({ username }, "PineappleshittyChickenGrilled", {
              expiresIn: 300,
            })

            return respond({ result: results, token: token, admin: ifadmin })
          } else {
            return respond({ message: "Invalid Log In", result: null })
          }
        })
      } else {
        respond({ message: "Invalid Log In", result: null })
      }
    })
  } else {
    respond({ message: "Please Enter Username and Password!", result: null })
    //response(null, null)
  }
}

const addgrp = (req, respond) => {
  if (req.body) {
    let addinggrpquery = `INSERT INTO grps (grp,status) values ('${req.body.group}','${req.body.status}')`
    connection.query(addinggrpquery, (err, result) => {
      if (err) {
        throw err
      } else {
        respond(null, { message: "Group Roles is Added", result: { message: "Well Done" } })
      }
    })
  }
}

const graballgrp = (req, respond) => {
  console.log("Checking loggging data")

  console.log("Database accessed")
  connection.query("select * from grps", (err, results) => {
    if (err) {
      throw err
    }
    if (results.length > 0) {
      console.log("Groups Grabbed", results)
      respond(null, { message: "correct", result: results })
    } else {
      respond(null, { message: "Incorrect", result: null })
    }
  })
}

const graballuser = (req, respond) => {
  console.log("Checking loggging data")

  console.log("Database accessed")
  connection.query("select * from account", (err, results) => {
    if (err) {
      throw err
    }
    if (results.length > 0) {
      console.log("Groups Grabbed", results)
      respond(null, { message: "correct", result: results })
    } else {
      respond(null, { message: "Incorrect", result: null })
    }
  })
}

const grpstatus = (req, respond) => {
  console.log("updating user", req.body.grp, req.body.status)

  console.log("Database accessed for updating")
  connection.query("update grps SET status = ? where grp = ?", [req.body.status, req.body.grp], (err, results) => {
    if (err) {
      throw err
    } else {
      respond(null, { message: "Group Status Updated", result: results }) // meed to to testing query over here
    }
  })
}

const grabUserInfos = (req, respond) => {
  username = req.params.username
  console.log("updating user", req.params.username)

  console.log("updating user1", username)
  console.log("Database accessed for updating")
  connection.query("select account.email, account.password ,account.status, account.grp from account where account.username = ?", [username], (err, results) => {
    if (err) {
      throw err
    } else {
      //console.log("hais")
      respond(null, { message: "correct", result: results })
    }
  })
}

const EditUserInfos = async (req, respond) => {
  email = req.body.email
  group = req.body.selectedGroup
  statuss = req.body.status
  username = req.body.username

  console.log("Database accessed for updating")
  if (req.body.password === "") {
    connection.query("UPDATE account SET email = ? ,grp = ? ,status = ? WHERE account.username = ?", [email, group, statuss, username], (err, results) => {
      if (err) {
        throw err
      } else {
        respond(null, { message: "User Status Updated", result: { message: "done " } }) // meed to to testing query over here
      }
    })
  }
  if (req.body.password !== "") {
    password = await bcrypt.hash(req.body.password, saltRound)
    console.log(password)
    connection.query("UPDATE account SET email = ? ,grp = ? ,status = ?,password = ? WHERE account.username = ?", [email, group, statuss, password, username], (err, results) => {
      if (err) {
        throw err
      } else {
        respond(null, { message: "User Status with password Updated", result: { message: "done" } }) // meed to to testing query over here
      }
    })
  }
}

const CreateApp = (req, respond) => {
  console.log(req.body, "create App Parameters")
  //req.body.description
  let addingappquery = `INSERT INTO application (App_acronym, App_Description, App_Rnumber, App_startDate, App_endDate, App_permit_Create, App_permit_Open,App_permit_toDoList, App_permit_Doing, App_permit_Done) values ('${req.body.appAcronym}','${req.body.description}','${req.body.rnum}','${req.body.startDate}','${req.body.endDate}','${req.body.permitCreate}','${req.body.permitOpen}','${req.body.permitTodoList}','${req.body.permitDoing}','${req.body.permitDone}')`
  connection.query(addingappquery, (err, result) => {
    if (err) {
      throw err
    } else {
      respond({ message: "Application is Created", result: { message: "Well Done" } })
    }
  })
}
const graballapplication = (req, respond) => {
  connection.query("select * from application", (err, results) => {
    if (err) {
      throw err
    }
    if (results.length > 0) {
      console.log("application Grabbed", results)
      respond({ message: "correct", result: results })
    } else {
      respond({ message: "Incorrect", result: null })
    }
  })
}

const grabAppInfos = (req, respond) => {
  acronym = req.params.acronym
  console.log("updating app", req.params.acronym)
  console.log("updating app", acronym)
  console.log("Database accessed for updating")
  connection.query("select * from application where application.App_acronym = ?", [acronym], (err, results) => {
    if (err) {
      throw err
    } else {
      //console.log("hais")
      respond({ message: "correct", result: results })
    }
  })
}
const EditApp = (req, respond) => {
  console.log(req.body, "create App Parameters")

  connection.query("UPDATE application SET App_Description = ? ,App_startDate = ? ,App_endDate = ?, App_permit_Create=?, App_permit_Open=?, App_permit_toDoList=?, App_permit_Doing=?, App_permit_Done=? WHERE application.App_acronym = ?", [req.body.appdes, req.body.appstart, req.body.append, req.body.appcreate, req.body.appopen, req.body.apptodo, req.body.appdoing, req.body.appdone, req.body.appAcronym], (err, results) => {
    if (err) {
      throw err
    } else {
      respond({ message: "Application Status Updated", result: { message: "done " } }) // meed to to testing query over here
    }
  })
}
const CreatePlan = (req, respond) => {
  console.log(req.body, "create App Parameters")

  let addingappquery = `INSERT INTO plan (Plan_MVP_name, Plan_startDate, Plan_endDate, Plan_app_Acronym,Plan_des) values ('${req.body.mvpName}','${req.body.startDate}','${req.body.endDate}','${req.body.appAcronym}', '${req.body.description}')`
  connection.query(addingappquery, (err, result) => {
    if (err) {
      throw err
    } else {
      respond({ message: "Application Plan is Edited", result: { message: "Well Done" } })
    }
  })
}
const grabPlanInfos = (req, respond) => {
  acronym = req.params.acronym

  console.log("hello group", req.params.group)
  const ifProjectManager = CheckGroup.checkProjectManager(req.params.group)
  console.log("updating app", acronym)
  console.log("Database accessed for updating")
  connection.query("select * from plan where Plan_app_Acronym = ?", [acronym], (err, results) => {
    if (err) {
      throw err
    } else {
      //console.log("hais")
      respond({ message: "correct", result: results, projectmanager: ifProjectManager })
    }
  })
}
const grabsinglePlanInfos = (req, respond) => {
  const mvpName = req.params.mvpName
  console.log("updating app", mvpName)

  console.log("Database accessed for updating")
  connection.query("select * from plan where Plan_MVP_name = ?", [mvpName], (err, results) => {
    if (err) {
      throw err
    } else {
      //console.log("hais")
      respond({ message: "correct", result: results })
    }
  })
}
const EditPlan = (req, respond) => {
  console.log(req.body, "create App Parameters")

  connection.query("UPDATE plan SET Plan_endDate=?, Plan_startDate=?, Plan_des=? WHERE Plan_MVP_name=?", [req.body.append, req.body.appstart, req.body.appdes, req.body.mvpName], (err, results) => {
    if (err) {
      throw err
    } else {
      respond({ message: "Application Status Updated", result: { message: "done " } }) // meed to to testing query over here
    }
  })
}

const CreateTask = async (req, respond) => {
  // console.log(req.body, "create App Parameters")
  let date_ob = new Date()
  let date = ("0" + date_ob.getDate()).slice(-2)
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2)
  let year = date_ob.getFullYear()
  let hours = date_ob.getHours()
  let minutes = date_ob.getMinutes()
  let seconds = date_ob.getSeconds()
  let string = ""
  string = await string.concat(year, "-", month, "-", date, " ", hours, ":", minutes, ":", seconds)
  // console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
  let cstring = ""
  cstring = await cstring.concat(req.body.user, " ", "Open ", string, " ", "Create by ", " ", req.body.user)
  // prints time in HH:MM format
  console.log(hours + ":" + minutes)

  let addingappquery = `INSERT INTO Task (Task_id, Task_name, Task_Description,Task_plan, Task_createDate, Task_notes ,Task_state, Task_App_Acronym,Task_creator, Task_Owner) values ('${req.body.taskid}','${req.body.taskName}','${req.body.description}','${req.body.selmvpName}','${req.body.createDate}','${cstring}','${"Open"}','${req.body.appAcronym}','${req.body.user}','${req.body.user}')`
  connection.query(addingappquery, (err, result) => {
    if (err) {
      throw err
    } else {
      respond({ message: "Application Task is Added", result: { message: "Well Done" } })
    }
  })
}
const RnumIncrement = (req) => {
  // console.log(req.body.appAcronym)

  connection.query("UPDATE application SET `APP_RNumber` = `APP_RNumber`+1 WHERE App_acronym = ?", [req.body.appAcronym])
}

const GrabTask = (req, respond) => {
  acronym = req.params.acronym

  // console.log("hello group", req.params.state)
  // console.log("updating app", acronym)
  // console.log("Database accessed for updating")
  connection.query("SELECT * FROM task WHERE Task_app_Acronym=? AND Task_state=?", [acronym, req.params.state], (err, results) => {
    if (err) {
      throw err
    } else {
      //console.log("hais")
      respond({ message: "correct", result: results })
    }
  })
}
const handlestatechange = (req, respond) => {
  if (req.body.g === "Done") {
    emailstatus = CheckGroup.EmailSender(req.body.f, req.body.e)
  }
  console.log(req.body.notes)
  connection.query("UPDATE task SET Task_state = ?, Task_notes=?, Task_owner=? WHERE Task_id = ? ", [req.body.g, req.body.string2, req.body.f, req.body.e], (err, results) => {
    if (err) {
      throw err
    } else {
      respond({ result: "message" })
    }
  })
}
const EditTask = (req, respond) => {
  console.log(req.body.appAcronym)
  let date_ob = new Date()
  let date = ("0" + date_ob.getDate()).slice(-2)
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2)
  let year = date_ob.getFullYear()
  let hours = date_ob.getHours()
  let minutes = date_ob.getMinutes()
  let seconds = date_ob.getSeconds()
  let string = ""
  string = string.concat(year, "-", month, "-", date, " ", hours, ":", minutes, ":", seconds)

  connection.query("UPDATE task SET Task_description = ?,Task_plan=?, Task_notes=?, Task_owner=? WHERE Task_id = ? ", [req.body.description, req.body.selmvpName, req.body.string3, req.body.user, req.body.taskid], (err, results) => {
    if (err) {
      throw err
    } else {
      respond({ message: "Task Edited" })
    }
  })
}
const grabtask = (req, respond) => {
  taskid = req.params.taskid
  console.log("updating user", req.params.taskid)

  console.log("updating user1", taskid)
  console.log("Database accessed for updating")
  connection.query("select * from task where Task_id = ?", [taskid], (err, results) => {
    if (err) {
      throw err
    } else {
      //console.log("hais")
      console.log(results[0])
      respond({ message: "correct", result: results })
    }
  })
}

module.exports = {
  addUser,
  getUser,
  updateUserpassword,
  updateUseremail,
  checkLoggin,
  addgrp,
  graballgrp,
  graballuser,
  grpstatus,
  grabUserInfos,
  EditUserInfos,
  CreateApp,
  graballapplication,
  grabAppInfos,
  EditApp,
  CreatePlan,
  grabPlanInfos,
  grabsinglePlanInfos,
  EditPlan,
  CreateTask,
  RnumIncrement,
  GrabTask,
  handlestatechange,
  EditTask,
  grabtask,
}
