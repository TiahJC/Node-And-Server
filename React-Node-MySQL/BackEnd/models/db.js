const mysql = require("mysql")
function getConnection(err) {
  // create the connection
  const connection = mysql.createPool({
    connectionLimit: 20,
    host: "localhost",
    user: "root",
    password: "Lightfox@12",
    database: "nodejs1",
  })
  if (err) {
    return console.error("error: " + err.message)
  }
  //console.log("Connected to mySQL Server")

  return connection
}

module.exports = getConnection
