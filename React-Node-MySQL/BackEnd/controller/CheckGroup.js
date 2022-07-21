const nodemailer = require("nodemailer")
const getConnection = require("../models/db")

const checkGroup = async (username, groupname) => {
  console.log(groupname, groupname.split(","))

  const str = groupname.split(",")

  if (str.includes("admin")) {
    return true
  } else {
    return false
  }
}
const checkPermit = async (Application, Group, PermitChosen) => {}
const checkProjectManager = (group) => {
  const str = group.split(",")
  //console.log("Check", str)
  if (str.includes("ProjectManager")) {
    return true
  } else {
    return false
  }
}

const EmailSender = async (username, taskid) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  connection = getConnection()
  let totalstring = "Aa"
  let senderemail = "AA"
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ba49368ee59cad",
      pass: "e77bf70b16a81d",
    },
  })
  let gettinguserquery = `select account.username, account.email from account where account.grp LIKE '%ProjectLead%'`
  connection.query(gettinguserquery, (err, res) => {
    if (err) {
      console.log("err")
    }
    if (res.length) {
      let string = res.reduce((total, user) => {
        return total + `${user.email},`
      }, "")
      totalstring = string
      console.log("email Listed ", string, totalstring)
      let getuser = `select account.username,account.email from account where account.username = '${username}'`
      connection.query(getuser, async (err, res) => {
        if (err) {
          throw err
        } else {
          let email = res[0].email
          senderemail = email
          console.log("senderemail", senderemail)
        }
      })
      console.log("any value", totalstring, senderemail)
      // send mail with defined transport object
      let info = transporter.sendMail({
        from: `"${username}" <${senderemail}>"`, // sender address
        to: `"${totalstring}"`, // list of receivers
        subject: `"${taskid} has been submitted "`, // Subject line
        text: `"Task"`, // plain text body
        html: `"<b>Please Check on the task</b>"`, // html body
      })
      console.log("Message sent: %s", info.messageId)
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
    } else {
      console.log("there no data ")
    }
  })

  return true
}

module.exports = {
  checkGroup,
  checkProjectManager,
  EmailSender,
}
