import React, { useEffect, useState } from "react"
import Axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { Multiselect } from "multiselect-react-dropdown"

function CreatePlan() {
  const [appAcronym, setappAcronym] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setstartDate] = useState("")
  const [message, setMessage] = useState("")
  const [endDate, setendDate] = useState([])
  const [mvpName, setMvpName] = useState("")

  let array = []
  let string = ""

  //---------------------------------//
  const navigate = useNavigate()
  useEffect(() => {
    setappAcronym(localStorage.getItem("ViewApplication"))
  }, [])
  //--------------------------------//
  function handleSubmit(e) {
    e.preventDefault()
    setMessage("")
    console.log("Upon Submiting", mvpName, appAcronym, description, startDate, endDate)
    try {
      Axios.post("http://localhost:8000/createplan", { mvpName, startDate, endDate, appAcronym, description }).then((response) => {
        setMessage(response.data.message)
        if (response.data.result != null) {
          console.log("Hello", response.data)
          setMessage(response.data.message)
        }
        console.log("Hello", response.data)
        setMessage(response.data.message)
        console.log(message)
        window.scrollTo(0, 0)
        window.setTimeout(function () {
          window.location.reload()
        }, 500)
      })
    } catch (e) {
      console.log("Logging In session Line 22 Login.js Occured error")
    }
  }
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
          <Link to={"/viewindividualApplication/" + localStorage.getItem("ViewApplication")}>
            <button className="btn btn-sm btn-secondary">Back to Previous</button>
          </Link>
          {message && (
            <div>
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-4 rounded relative" role="alert">
                {message}
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="text-muted mb-1">
                <small>Application Acronym</small>
              </label>
              <h2>&nbsp;&nbsp;&nbsp;{localStorage.getItem("ViewApplication")}</h2>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text-muted mb-1">
                <small>MVP Name</small>
              </label>
              <input onChange={(e) => setMvpName(e.target.value)} name="password" className="form-control" type="form-control" placeholder="MVP Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text-muted mb-1">
                <small>Description</small>
              </label>
              <textarea onChange={(e) => setDescription(e.target.value)} name="password" className="form-control" type="text" placeholder="Description" />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="text-muted mb-1">
                <small>Start Date</small>
              </label>
              <input onChange={(e) => setstartDate(e.target.value)} name="email" className="form-control" type="date" />
              <small>End Date</small>
              <input onChange={(e) => setendDate(e.target.value)} name="email" className="form-control" type="date" />
            </div>

            <button className="btn btn-dark" style={{ marginTop: "10px" }}>
              {" "}
              Create Plan{" "}
            </button>
            {message && (
              <div>
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-4 rounded relative" role="alert">
                  {message}
                </div>
              </div>
            )}
          </form>{" "}
        </div>
      </div>
    </div>
  )
}
export default CreatePlan
