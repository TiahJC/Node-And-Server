import React, { useState, useEffect } from "react"
//import Page from "./Page"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

function Login() {
  useEffect(() => {
    window.onload()
    localStorage.clear()
  }, [])
  window.onload = function () {
    if (!window.location.hash) {
      window.location = window.location + "#loaded"
      window.location.reload()
    }
  }
  const [username, setUsername] = useState("")
  //const[a,b] a => Access to current value, b => update on the recent value
  //const [email, setEmail] = useState()
  const [password, setPassword] = useState("")
  //const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [arraygroup, Setarraygroup] = useState([])
  let array = []
  let string = ""
  const navigate = useNavigate()
  function handleSubmit(e) {
    e.preventDefault()
    setMessage("")
    //setLoading(true)
    try {
      Axios.post("http://localhost:8000/login", { username, password }).then((response) => {
        console.log("h", response)
        if (response.data.result != null) {
          localStorage.setItem("TMSAppUsername", response.data.result[0].username)
          localStorage.setItem("TMSAppPassword", response.data.result[0].password)
          localStorage.setItem("TMSAppGrp", response.data.result[0].grp)
          localStorage.setItem("JWTtoken", response.data.token)
          string = localStorage.getItem("TMSAppGrp")
          console.log(string, "string variable")
          array = string.split(",")
          console.log("array", array)
          Setarraygroup(array)
          localStorage.setItem("TMSAppStatus", response.data.result[0].status)
          localStorage.setItem("TMSAppEmail", response.data.result[0].email)
          localStorage.setItem("LoggedinState", "True")
          console.log(localStorage.getItem("TMSAppUsername"))
          console.log("Hello", localStorage.getItem("TMSAppGrp"))
          console.log("stored", arraygroup)
          navigate("/home")
        } else {
          console.log(response.data.message)
          navigate("/")
          setMessage(response.data.message)
        }
      })
    } catch (e) {
      setMessage("Sorry for the Server Issue Will be attend as soon as possible")
      console.log("Logging In session Line 22 Login.js Occured error")
    }
  }
  return (
    // <Page wide={true}>
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="row align-items-center">
        <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5" style={{ marginRight: "auto", marginLeft: "auto" }}>
          <form>
            <div className="form-group ">
              <label htmlFor="username">
                <small>Username</small>
              </label>
              <input onChange={(e) => setUsername(e.target.value)} name="username" className="form-control" type="text" placeholder="Username" autoComplete="off" />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text-muted mb-1">
                <small>Password</small>
              </label>
              <input onChange={(e) => setPassword(e.target.value)} name="password" className="form-control" type="password" placeholder="Password" />
            </div>
            <Button variant="dark" onClick={handleSubmit}>
              {" "}
              Sign In{" "}
            </Button>
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
export default Login
