import React, { useState, useEffect } from "react"
//import Page from "./Page"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import Button from "react-bootstrap/Button"

function TableUser() {
  const [allUser, setallUser] = useState([])
  const navigate = useNavigate()

  function handleexit() {
    console.log("bye")
    //props.setLoggedIn(false)
    navigate("/home")
  }
  function handleCreateUser(e) {
    e.preventDefault()
    navigate("/createuser")
  }
  function handleHandler(username) {
    console.log(username, "GEEZ")
    navigate("/edituser/" + username)
    localStorage.setItem("EditUsername", username)
  }

  useEffect(() => {
    Axios.get("http://localhost:8000/graballuser").then((response) => {
      console.log(response.data)
      //setGroup(response.data.result.map((group) => group.grp))
      setallUser(response.data.result)
    })
  }, [])
  /* function handleSubmit(e) {
    e.preventDefault()
    setMessage("")
    try {
      Axios.post("http://localhost:8000/login", { username, password }).then((response) => {
        console.log("h", response)
        if (response.data.result != null) {
        } else {
        }
      })
    } catch (e) {
      setMessage("Sorry for the Server Issue Will be attend as soon as possible")
      console.log("Logging In session Line 22 Login.js Occured error")
    }
  } */
  return (
    <div className="container" style={{ marginTop: "2px" }}>
      <Button onClick={handleexit} className="btn btn-sm btn-secondary" style={{ marginRight: "10px" }}>
        Back
      </Button>
      <Button onClick={handleCreateUser} className="btn btn-dark">
        Create User
      </Button>
      <div className="row align-items-center">
        <div style={{ marginRight: "auto", marginLeft: "auto" }}>
          <div className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Status</th>
                <th>Groups</th>
              </tr>
            </thead>
            <tbody>
              {allUser.map((doc, index) => {
                return (
                  <tr key={doc.username}>
                    <td>{index + 1}</td>
                    <td>{doc.username}</td>
                    <td>{doc.email}</td>
                    <td>{doc.status}</td>
                    <td>{doc.grp}</td>

                    <td>
                      <button onClick={(e) => handleHandler(doc.username)} className="btn btn-dark">
                        Edit Users
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TableUser
