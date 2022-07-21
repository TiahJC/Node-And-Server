import React, { useEffect, useState } from "react"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import { Multiselect } from "multiselect-react-dropdown"
import Button from "react-bootstrap/Button"

function CreateUser() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [group, setGroup] = useState([])
  const [status, setStatus] = useState("")
  const [selectedGroup, setSelectedGroup] = useState("")
  let array = []
  let string = ""

  //---------------------------------//
  const navigate = useNavigate()
  useEffect(() => {
    Axios.get("http://localhost:8000/graballgroup").then((response) => {
      console.log(response.data.result)
      //setGroup(response.data.result.map((group) => group.grp))
      setGroup(response.data.result)
      setStatus("Enabled")
    })
  }, [])

  //--------------------------------//
  function handleexit() {
    console.log("bye")
    //props.setLoggedIn(false)
    navigate("/Tableprojections")
  }
  const validatePassword = (password) => {
    console.log(password)
    var check = /[!@#$%^&*(),.?":{}|<>]/

    if (password.length < 8 || password.length > 10) {
      return false
    } else if (!check.test(password)) {
      return false
    } else {
      return true
    }
  }
  function handleSubmit(e) {
    e.preventDefault()
    setMessage("")
    const result = validatePassword(password)
    console.log("result", result)
    if (result) {
      try {
        console.log(selectedGroup)
        console.log(username)
        if (status === null) {
          setStatus("Enabled")
        }
        Axios.post("http://localhost:8000/createuser", { username, password, email, selectedGroup, status }).then((response) => {
          setMessage(response.data.message)
          if (response.data.result != null) {
            console.log("Hello", response.data)
            setMessage(response.data.message)
          }
          console.log("Hello", response.data)
          setMessage(response.data.message)
          console.log(message)
          window.location.reload()
        })
      } catch (e) {
        console.log("Logging In session Line 22 Login.js Occured error")
      }
    } else {
      setMessage("Invalid Password Format")
    }
    // if (password != "") {

    //   } else {
    //     alert("passwrod invalid format")
    //   }
    // } else {
    //   alert("password field is required")
    // }
  }
  /* const handleChange = (e) => {
    setSelectedGroup(e.target.value)
    alert("selectedGroup")
  } */
  const handleChange = (e) => {
    array = e.map((e) => e.grp)
    string = array.join(",")
    setSelectedGroup(string)
    console.log(string)
    console.log(selectedGroup)
  }
  const handleStatus = (e) => {
    console.log(e)
    setStatus(e)
  }
  return (
    <div className="container">
      <button onClick={handleexit} className="btn btn-dark" style={{ marginTop: "10px" }}>
        Back to Previous
      </button>
      <div className="row align-items-center">
        <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5" style={{ marginRight: "auto", marginLeft: "auto" }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="text-muted mb-1">
                <small>Username</small>
              </label>
              <input onChange={(e) => setUsername(e.target.value)} name="username" className="form-control" type="text" placeholder="Username" autoComplete="off" />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text-muted mb-1">
                <small>Password</small>
              </label>
              <input onChange={(e) => setPassword(e.target.value)} name="password" className="form-control" type="password" placeholder="Password" required />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="text-muted mb-1">
                <small>Email</small>
              </label>
              <input onChange={(e) => setEmail(e.target.value)} name="email" className="form-control" type="text" placeholder="Email" />
            </div>
            <div className="form-group">
              <label htmlFor="status" className="text-muted mb-1">
                <small>Status</small>
              </label>
              <select onChange={(e) => handleStatus(e.target.value)} defaultValue="Enabled">
                <option value="Enabled">Enabled</option>
                <option value="Disabled">Disabled</option>
              </select>
            </div>
            <small>Group</small>
            <Multiselect
              options={group}
              value={selectedGroup}
              onSelect={(e) => {
                handleChange(e)
              }}
              onRemove={(e) => {
                handleChange(e)
              }}
              displayValue={"grp"}
            />
            <button className="btn btn-dark"> Create Account </button>
            {message && (
              <div>
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-4 rounded relative" role="alert">
                  {message}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
export default CreateUser
