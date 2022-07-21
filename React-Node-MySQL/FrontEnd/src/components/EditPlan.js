import React, { useEffect, useState } from "react"
import Axios from "axios"
import { Multiselect } from "multiselect-react-dropdown"
import { useNavigate } from "react-router-dom"
function EditPlan() {
  const navigate = useNavigate()
  const [appAcronym, setappAcronym] = useState("")
  const [appdes, setAppdes] = useState("")
  const [appstart, setappstart] = useState("")
  const [append, setappend] = useState("")
  const [appcreate, setappcreate] = useState("")
  const [appopen, setappopen] = useState("")
  const [apptodo, setapptodo] = useState("")
  const [appdoing, setappdoing] = useState("")
  const [appdone, setappdone] = useState("")
  const [message, setMessage] = useState("")
  let string = ""
  let array = []
  useEffect(() => {
    const app = localStorage.getItem("ViewApplication")
    console.log(app)
    Axios.get("http://localhost:8000/grabplaninfos/" + localStorage.getItem("EditMVP")).then((response) => {
      console.log(response.data.result)
      setAppdes(response.data.result[0].Plan_des)
      setappstart(response.data.result[0].Plan_startDate)
      setappend(response.data.result[0].Plan_endDate)
    })
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    setMessage("")
    try {
      const mvpName = localStorage.getItem("EditMVP")
      Axios.put("http://localhost:8000/editplan", { append, appstart, appdes, mvpName }).then((response) => {
        setMessage(response.data.message)
        if (response.data.result != null) {
          console.log("Hello", response.data)
          setMessage(response.data.message)
        }
        console.log("Hello", response.data)
        setMessage(response.data.message)
        console.log(message)
      })
      window.scrollTo(0, 0)
      window.setTimeout(function () {
        window.location.reload()
      }, 500)
    } catch (e) {
      console.log("Logging In session Line 22 Login.js Occured error")
    }
  }
  const handleChange = (e) => {
    array = e.map((e) => e.grp)
    string = array.join(",")
    console.log(string)
    return string
  }
  function handleexit() {
    console.log("bye")
    //props.setLoggedIn(false)
    navigate("/viewindividualApplication/" + localStorage.getItem("ViewApplication"))
  }
  return (
    <div className="row align-items-center">
      <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
        <button onClick={handleexit} className="btn btn-dark" style={{ marginTop: "10px" }}>
          Back to Previous
        </button>
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
            <label htmlFor="username" className="text-muted mb-1">
              <small>MVP Name</small>
            </label>
            <h2>&nbsp;&nbsp;&nbsp;{localStorage.getItem("EditMVP")}</h2>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="text-muted mb-1">
              <small>Description</small>
            </label>
            <textarea onChange={(e) => setAppdes(e.target.value)} name="password" className="form-control" type="text" value={appdes} />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="text-muted mb-1">
              <small>Start Date</small>
            </label>
            <input onChange={(e) => setappstart(e.target.value)} value={appstart} name="email" className="form-control" type="date" />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="text-muted mb-1">
              <small>End Date</small>
            </label>
            <input onChange={(e) => setappend(e.target.value)} value={append} name="email" className="form-control" type="date" />
          </div>
          <button className="btn btn-dark"> Submit Changes </button>
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
  )
}

export default EditPlan
