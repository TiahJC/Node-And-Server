import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Axios from "axios"
function EditEmail() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
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
  async function handleSubmit(e) {
    e.preventDefault()
    setMessage("")
    console.log(email)
    if (email !== "undefined") {
      try {
        const username = localStorage.getItem("TMSAppUsername")
        Axios.put("http://localhost:8000/editemail", { username, email }).then((response) => {
          console.log("h", response)
          if (response.data.result != null) {
            console.log(response.data.messsage)
            console.log(localStorage.getItem("TMSAppEmail"))
            localStorage.setItem("TMSAppEmail", email)
            console.log(localStorage.getItem("TMSAppEmail"))
            console.log("Hello", localStorage.getItem("TMSAppGrp"))
          } else {
            console.log(response.data.message)
            setMessage(response.data.message)
          }
          console.log(response.data.message)
          setMessage(response.data.message)
        })
        window.location.reload()
      } catch (e) {
        console.log("Logging In session Line 22 Login.js Occured error")
      }
    } else {
      setMessage("Please Enter Email")
    }
  }

  return (
    <div className="row align-items-center">
      <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="text-muted mb-1">
              <h1>Username : {localStorage.getItem("TMSAppUsername")}</h1>
            </label>
            <input onChange={(e) => setEmail(e.target.value)} name="email" className="form-control" type="text" placeholder={localStorage.getItem("TMSAppEmail")} autoComplete="off" />
          </div>
          <button className="btn btn-success btn-block"> Edit Email </button>
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

export default EditEmail
