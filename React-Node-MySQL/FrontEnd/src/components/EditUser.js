import React, { useEffect, useState } from "react"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import { Multiselect } from "multiselect-react-dropdown"
function CreateUser() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [group, setGroup] = useState([])
  const [status, setStatus] = useState("")
  const [selectedGroup, setSelectedGroup] = useState("")
  const [destring, setdestring] = useState([])
  let string = ""
  let array = []

  //---------------------------------//
  const navigate = useNavigate()
  useEffect(() => {
    Axios.get("http://localhost:8000/graballgroup/").then((response) => {
      //setGroup(response.data.result.map((group) => group.grp))
      setStatus("Enabled")
      setGroup(
        response.data.result.map((res) => {
          return { grp: res.grp, index: res.grp }
        })
      )
      console.log(group)
    })
    Axios.get("http://localhost:8000/grabuserinfos/" + localStorage.getItem("EditUsername")).then((response) => {
      console.log("this", response.data.result, "hello", response.data.result[0].email)
      setUsername(localStorage.getItem("EditUsername"))
      setEmail(response.data.result[0].email)
      setMessage("")
      setSelectedGroup(response.data.result[0].grp)
      string = response.data.result[0].grp
      console.log("string", string)
      if (string !== "") {
        array = string.split(",")
        setdestring(
          array.map((name) => {
            return { grp: name, index: name }
          })
        )
      } else {
        setdestring([])
      }
      setStatus(response.data.result[0].status)

      // console.log("HELLO", response.data.result[0].email, response.data.result[0].grp, array, destring, response.data.result[0].status)
    })
  }, [])

  //--------------------------------//
  const handleStatus = (e) => {
    console.log(e)
    setStatus(e)
  }
  function handleexit() {
    console.log("bye")
    //props.setLoggedIn(false)
    navigate("/Tableprojections")
  }
  const validatePassword = (password) => {
    console.log(password)
    var check = /[!@#$%^&*(),.?":{}|<>]/
    if (password !== "") {
      if (password.length < 8 || password.length > 10) {
        return false
      } else if (!check.test(password)) {
        return false
      } else {
        return true
      }
    } else {
      console.log("hello,empty")
      return true
    }
  }
  function handleSubmit(e) {
    e.preventDefault()
    setMessage("")
    console.log("here", password)
    const result = validatePassword(password)
    console.log("result", result)
    if (result) {
      try {
        console.log(selectedGroup)
        console.log(username)
        Axios.put("http://localhost:8000/edituser", { username, password, email, selectedGroup, status }).then((response) => {
          setMessage(response.data.message)
          if (response.data.result != null) {
            console.log("Hello")
          }
        })
        window.location.reload()
      } catch (e) {
        console.log("Logging In session Line 22 Login.js Occured error")
      }
    } else {
      setMessage("Invalid Password Format")
    }
  }
  const handleChange = (e) => {
    array = e.map((e) => e.grp)
    string = array.join(",")
    setSelectedGroup(string)
    console.log(string)
    console.log(selectedGroup)
  }
  return (
    <div className="row align-items-center">
      <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="text-muted mb-1">
              <small>Username</small>
            </label>
            <h2>&nbsp;&nbsp;&nbsp;{localStorage.getItem("EditUsername")}</h2>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="text-muted mb-1">
              <small>Password</small>
            </label>
            <input onChange={(e) => setPassword(e.target.value)} name="password" className="form-control" type="password" placeholder="Password" />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="text-muted mb-1">
              <small>Email</small>
            </label>
            <input onChange={(e) => setEmail(e.target.value)} value={email} name="email" className="form-control" type="text" placeholder="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="status" className="text-muted mb-1">
              <small>Status</small>
            </label>
            <select onChange={(e) => handleStatus(e.target.value)} value={status}>
              <option value="Enabled">Enabled</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
          <small>Group</small>
          <Multiselect
            options={group}
            selectedValues={destring}
            onSelect={(e) => {
              handleChange(e)
            }}
            onRemove={(e) => {
              handleChange(e)
            }}
            displayValue={"grp"}
          />
          <button className="btn btn-success btn-block"> Submit Changes </button>
          {message && (
            <div>
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-4 rounded relative" role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
        <button onClick={handleexit} className="btn btn-sm btn-secondary">
          Back to Previous
        </button>
      </div>
    </div>
  )
}
export default CreateUser
