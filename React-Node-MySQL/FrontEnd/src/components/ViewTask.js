import React, { useEffect, useState } from "react"
import Axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { Multiselect } from "multiselect-react-dropdown"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { appendOwnerState } from "@mui/base"
import { Windows } from "react-bootstrap-icons"
let array1 = []
let taskid = ""
let app = ""
function ViewTask() {
  const [appAcronym, setappAcronym] = useState("")
  const [description, setDescription] = useState("")
  const [createDate, setcreateDate] = useState("")
  const [message, setMessage] = useState("")
  const [mvpName, setMvpName] = useState("")
  const [taskName, settaskName] = useState("")
  const [selmvpName, setselMvpName] = useState("")
  const [rnumber, setrnumber] = useState("")
  const [tasknote, settasknote] = useState("")
  const [creator, setcreator] = useState("")
  const [ptasknote, setptasknote] = useState("")
  const [plan, setplan] = useState([])
  const [oplan, setoplan] = useState("")
  const [odes, setodes] = useState("")
  let array = []
  let string = ""
  let appData = JSON.parse(localStorage.getItem("viewtask"))

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
      console.log(response.data.result)
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

    console.log("looking at appdata", appData)
    string = localStorage.getItem("viewtask")
    console.log(string)
    console.log(appData)

    taskid = appData.Task_id

    Axios.get("http://localhost:8000/grabtask/" + taskid).then((response) => {
      console.log("useeffect", response.data.result[0])
      setcreator(response.data.result[0].Task_owner)
      setptasknote(response.data.result[0].Task_notes)
      setDescription(response.data.result[0].Task_Description)
      setoplan(response.data.result[0].Task_plan)
      setodes(response.data.result[0].Task_Description)
      let plan_obj = {}
      plan_obj.plan_MVP_name = response.data.result[0].Task_plan
      plan_obj.index = response.data.result[0].Task_plan
      let plan_array = []
      plan_array.push(plan_obj)
      console.log("array", plan_array)
      setplan(plan_array)
      localStorage.setItem("viewtask", JSON.stringify(response.data.result[0]))
      //console.log(response.data.result)
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
      const user = localStorage.getItem("TMSAppUsername")
      let string3 = ""
      string3 = string3.concat(tasknote, "\n\n", appData.Task_notes)
      let date_ob = new Date()
      let date = ("0" + date_ob.getDate()).slice(-2)
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2)
      let year = date_ob.getFullYear()
      let hours = date_ob.getHours()
      let minutes = date_ob.getMinutes()
      let seconds = date_ob.getSeconds()
      let string = ""
      string = string.concat(year, "-", month, "-", date, " ", hours, ":", minutes, ":", seconds)
      let cstring = ""
      console.log(oplan, "middle", selmvpName)
      if (oplan !== selmvpName) {
        string3 = `${localStorage.getItem("TMSAppUsername")},${appData.Task_state}, " ", ${string}, " ", "Task Plan Have Been Edited to ", ${selmvpName}, "\n"` + string3
        // string3 = string3.concat(localStorage.getItem("TMSAppUsername"), " ", appData.Task_state, " ", string, " ", "Task Plan Have Been Edited to ", selmvpName, "\n", string3)
        console.log(string3)
      }
      console.log(odes, "middle", description)
      if (odes !== description) {
        string3 = `${localStorage.getItem("TMSAppUsername")},${appData.Task_state}, " ", ${string}, " ", "Task Description Have Been Changed to ", ${description}, "\n"` + string3
      }
      console.log("hellllllooooooooooooooooooooooooooooooooooo", appData.Task_notes)
      Axios.post("http://localhost:8000/edittask", { taskid, description, selmvpName, user, appAcronym, string3 }).then((response) => {
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
        window.location.reload()
      })
    } catch (e) {
      console.log("Logging In session Line 22 Login.js Occured error")
    }
  }

  function handletasknote(e) {
    let date_ob = new Date()
    let date = ("0" + date_ob.getDate()).slice(-2)
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2)
    let year = date_ob.getFullYear()
    let hours = date_ob.getHours()
    let minutes = date_ob.getMinutes()
    let seconds = date_ob.getSeconds()
    let string = ""
    string = string.concat(year, "-", month, "-", date, " ", hours, ":", minutes, ":", seconds)
    let cstring = ""
    cstring = cstring.concat(localStorage.getItem("TMSAppUsername"), " ", appData.Task_state, string, " ", "Note added : ", e)
    settasknote(cstring)
  }

  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
          <Link to={"/viewindividualApplication/" + localStorage.getItem("ViewApplication")}>
            <button className="btn btn-sm btn-secondary">Back to Previous</button>
          </Link>
          <form onSubmit={handleSubmit}>
            <h1 style={{ textAlign: "center" }}>
              <strong>Edit Task</strong>
            </h1>
            <label className="text-muted mb-1">
              <small>Task ID Name</small>
            </label>
            <h2>{appData.Task_id}</h2>
            <div className="form-group">
              <label className="text-muted mb-1">
                <small>Application Acronym</small>
              </label>
              <h2>&nbsp;&nbsp;&nbsp;{localStorage.getItem("ViewApplication")}</h2>
            </div>
            <div className="form-group">
              <label className="text-muted mb-1">
                <small>Task Name</small>
              </label>
              <h2>&nbsp;&nbsp;&nbsp;{appData.Task_name}</h2>
            </div>
            <div className="form-group">
              <label className="text-muted mb-1">
                <small>Created By</small>
              </label>
              <h2>&nbsp;&nbsp;&nbsp;{appData.Task_creator}</h2>
            </div>
            <Container>
              <Row>
                <Col>
                  <label className="text-muted mb-1">
                    <small>Latest Edited By</small>
                  </label>
                  <h2>&nbsp;&nbsp;&nbsp;{creator}</h2>
                </Col>
                <Col>
                  <label className="text-muted mb-1">
                    <small>Current Task State</small>
                  </label>
                  <h2>&nbsp;&nbsp;&nbsp;{appData.Task_state}</h2>
                </Col>
              </Row>
            </Container>
            <div className="form-group">
              <label className="text-muted mb-1">
                <small>Task Notes</small>
              </label>
              <p className="red">{ptasknote}</p>
            </div>
            <div className="form-group">
              <label className="text-muted mb-1">
                <small>MVP Name</small>
              </label>
              <Multiselect
                singleSelect={true}
                options={array1}
                selectedValues={plan}
                disable
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
                <small>Task Description</small>
              </label>
              <textarea onChange={(e) => setDescription(e.target.value)} className="form-control" type="text" value={description} disabled />
            </div>
            <div className="form-group">
              <label className="text-muted mb-1">
                <small>Start Date</small>
              </label>
              <input onChange={(e) => setcreateDate(e.target.value)} className="form-control" type="date" value={appData.Task_createDate} disabled />
            </div>
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
export default ViewTask
