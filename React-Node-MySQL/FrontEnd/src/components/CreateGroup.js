import React, { useState, useEffect } from "react"
import Axios from "axios"
import { useNavigate } from "react-router-dom"

function CreateGroup() {
  const [group, setGroup] = useState("")
  const [status, setStatus] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    setStatus("Enabled")
  }, [])

  function handleexit() {
    //props.setLoggedIn(false)
    navigate("/editgroup")
  }
  const handleStatus = (e) => {
    console.log(e)
    setStatus(e)
  }
  function handleSubmit(e) {
    e.preventDefault()
    setMessage("")
    if (group !== "") {
      try {
        Axios.post("http://localhost:8000/creategroup", { group, status }).then((response) => {
          console.log("h", response)
          console.log("message", response.data.message)
          setMessage(response.data.message)
          if (response.data.result != null) {
            console.log("message", response.data.message)
            console.log("Hello")
          }
        })
        window.location.reload()
      } catch (e) {
        console.log("Logging In session Line 22 Login.js Occured error")
      }
    } else {
      setMessage("Enter Group Name")
    }
  }
  return (
    <div className="container" style={{ marginTop: "2px" }}>
      <button onClick={handleexit} className="btn btn-secondary">
        Back to Previous
      </button>
      <div className="row align-items-center">
        <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5" style={{ marginRight: "auto", marginLeft: "auto" }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="group" className="text-muted mb-1">
                <small>Group</small>
              </label>
              <input onChange={(e) => setGroup(e.target.value)} name="group" className="form-control" type="group" placeholder="Group" />
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
            <button className="btn btn-dark"> Create </button>
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
export default CreateGroup
