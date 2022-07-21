import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Axios from "axios"
function EditPassword() {
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  let array = []
  let string = ""
  function handleexit() {
    //props.setLoggedIn(false)
    string = localStorage.getItem("TMSAppGrp")
    array = string.split(",")
    if (array.includes("admin")) {
      navigate("/admins")
    } else {
      navigate("/user")
    }
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
        const username = localStorage.getItem("TMSAppUsername")
        // console.log("check", getuser)
        // setUsername(getuser)
        console.log(password)
        Axios.put("http://localhost:8000/editpassword", { username, password }).then((response) => {
          console.log("h", response)
          if (response.data.result) {
            // console.log(localStorage.getItem("TMSAppPassword"))
            // console.log("Hello", localStorage.getItem("TMSAppGrp"))
            alert("Update successfully")
            window.location.reload()
          } else {
            console.log(response.data.message)
            setMessage(response.data.message)
            alert("update failure")
          }
        })
      } catch (e) {
        console.log("Logging In session Line 22 Login.js Occured error")
        alert("s")
      }
    } else {
      setMessage("Invalid Password Format")
    }
  }

  return (
    <div className="row align-items-center">
      <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="username" className="text-muted mb-1">
              <h1>Username : {localStorage.getItem("TMSAppUsername")}</h1>
            </label>
            <input onChange={(e) => setPassword(e.target.value)} name="password" className="form-control" type="password" placeholder="Change password" autoComplete="off" />
          </div>
          <button className="btn btn-success btn-block"> Edit password </button>
          {message && (
            <div>
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-4 rounded relative" role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
        <button onClick={handleexit} className="btn btn-sm btn-secondary">
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default EditPassword
