import React, { useEffect, useState } from "react"
import Axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { Multiselect } from "multiselect-react-dropdown"
let array1 = []
let taskid = ""
let app = ""
function CreateTask() {
  const [appAcronym, setappAcronym] = useState("")
  const [description, setDescription] = useState("")
  const [taskplan, setTaskPlan] = useState("")
  const [message, setMessage] = useState("")
  const [endDate, setendDate] = useState([])
  const [mvpName, setMvpName] = useState("")
  const [taskName, settaskName] = useState("")
  const [selmvpName, setselMvpName] = useState("")
  const [rnumber, setrnumber] = useState("")
  let array = []
  let string = ""

  //---------------------------------//
  const navigate = useNavigate()
  useEffect(() => {
    const acronym = localStorage.getItem("ViewApplication")
    const group = localStorage.getItem("TMSAppGrp")
    setappAcronym(localStorage.getItem("ViewApplication"))
    app = localStorage.getItem("ViewApplication")

    console.log(string)
    Axios.get("http://localhost:8000/graballplan/" + acronym + "/" + group).then((response) => {
      setrnumber(localStorage.getItem("R_number"))
      string = appAcronym.concat("_", localStorage.getItem("R_number"))
      //console.log(response.data.result)
      setMvpName(
        response.data.result.map((res) => {
          return { Plan_MVP_name: res.Plan_MVP_name, index: res.Plan_MVP_name }
        })
      )
      array1 = response.data.result.map((res) => {
        return { Plan_MVP_name: res.Plan_MVP_name, index: res.Plan_MVP_name }
      })
      array1.unshift({ Plan_MVP_name: null, index: null })
      console.log(array)
      console.log(
        response.data.result.map((res) => {
          return { Plan_MVP_name: res.Plan_MVP_name, index: res.Plan_MVP_name }
        })
      )
    })
  }, [])

  const handleChange = (e) => {
    array = e.map((e) => e.Plan_MVP_name)
    string = array.join(",")
    console.log(string)
    return string
  }
  //--------------------------------//
  function handleSubmit(e) {
    e.preventDefault()
    setMessage("")
    try {
      let date_ob = new Date()
      let date = ("0" + date_ob.getDate()).slice(-2)
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2)
      let year = date_ob.getFullYear()
      const createDate = string.concat(year, "-", month, "-", date)
      console.log(string)
      var todayDate = new Date().toISOString().slice(0, 10)
      const user = localStorage.getItem("TMSAppUsername")
      taskid = app.concat("_", localStorage.getItem("R_number"))
      console.log(todayDate, taskid)
      Axios.post("http://localhost:8000/createtask", { taskid, taskName, description, selmvpName, createDate, user, appAcronym }).then((response) => {
        setMessage(response.data.message)
        if (response.data.result != null) {
          console.log("Hello", response.data)
          setMessage(response.data.message)
        }
        console.log("Hello", response.data)
        setMessage(response.data.message)
        console.log(message)
        let rnum = Number(localStorage.getItem("R_number"))
        rnum = rnum + 1
        console.log(rnum)
        localStorage.setItem("R_number", String(rnum))
        console.log(rnum)
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
              <label className="text-muted mb-1">
                <small>Application Acronym</small>
              </label>
              <h2>&nbsp;&nbsp;&nbsp;{localStorage.getItem("ViewApplication")}</h2>
            </div>
            <div className="form-group">
              <label className="text-muted mb-1">
                <small>MVP Name</small>
              </label>
              <Multiselect
                singleSelect={true}
                options={array1}
                onSelect={(e) => {
                  const string = handleChange(e)
                  setselMvpName(string)
                }}
                onRemove={(e) => {
                  const string = handleChange(e)
                }}
                displayValue={"index"}
              />
            </div>
            <div className="form-group">
              <label className="text-muted mb-1">
                <small>Task Name</small>
              </label>
              <input onChange={(e) => settaskName(e.target.value)} className="form-control" type="text" placeholder="Task Name (Compulsory)" required />
            </div>
            <div className="form-group">
              <label className="text-muted mb-1">
                <small>Task Description</small>
              </label>
              <textarea onChange={(e) => setDescription(e.target.value)} className="form-control" type="text" placeholder="Description" />
            </div>
            {/* <div className="form-group">
              <label className="text-muted mb-1">
                <small>Start Date</small>
              </label>
              <input onChange={(e) => setcreateDate(e.target.value)} className="form-control" type="date" />
            </div> */}
            <button className="btn btn-dark" style={{ marginTop: "10px" }}>
              {" "}
              Create Task{" "}
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
export default CreateTask
