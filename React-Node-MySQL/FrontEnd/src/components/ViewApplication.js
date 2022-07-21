import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Axios from "axios"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

function ViewApplication() {
  const [allplan, setallplan] = useState([])
  const [projectmanager, setprojectmanager] = useState("")
  const [open, setopen] = useState([])
  const [todo, settodo] = useState([])
  const [doing, setdoing] = useState([])
  const [done, setdone] = useState([])
  const [close, setclose] = useState([])
  const task = ["Open", "ToDo", "Doing", "Done", "Close"]
  useEffect(() => {
    async function states() {
      const acronym = localStorage.getItem("ViewApplication")
      const group = localStorage.getItem("TMSAppGrp")
      console.log(acronym)
      let Open = "Open"
      let Todo = "ToDo"
      let Doing = "Doing"
      let Done = "Done"
      let Close = "Close"
      await Axios.get("http://localhost:8000/graballplan/" + acronym + "/" + group).then((response) => {
        //setGroup(response.data.result.map((group) => group.grp))
        setallplan(response.data.result)
        setprojectmanager(response.data.projectmanager)
        console.log(response.data)
      })
      await Axios.get("http://localhost:8000/grabtask/" + acronym + "/" + Open).then((response) => {
        //setGroup(response.data.result.map((group) => group.grp))
        setopen(response.data.result)
        console.log(response.data.result, "Open")
      })
      await Axios.get("http://localhost:8000/grabtask/" + acronym + "/" + Todo).then((response) => {
        //setGroup(response.data.result.map((group) => group.grp))
        settodo(response.data.result)
        console.log(response.data.result, "Todo")
      })
      await Axios.get("http://localhost:8000/grabtask/" + acronym + "/" + Doing).then((response) => {
        //setGroup(response.data.result.map((group) => group.grp))
        setdoing(response.data.result)
        console.log(response.data.result, "Doing")
      })
      await Axios.get("http://localhost:8000/grabtask/" + acronym + "/" + Done).then((response) => {
        //setGroup(response.data.result.map((group) => group.grp))
        setdone(response.data.result)
        console.log(response.data.result, "Done")
      })
      await Axios.get("http://localhost:8000/grabtask/" + acronym + "/" + Close).then((response) => {
        //setGroup(response.data.result.map((group) => group.grp))
        setclose(response.data.result)
        console.log(response.data.result, "Close")
      })
    }
    states()
  }, [])
  const navigate = useNavigate()
  function handleCreatePlan() {
    navigate("/createplan")
  }
  function handleEditPlan(e) {
    localStorage.setItem("EditMVP", e)
    navigate("/editplan/" + e)
  }
  function handleCreateTask() {
    navigate("/createtask")
  }
  function handlestatechange(e, f, g, notes) {
    let date_ob = new Date()
    let date = ("0" + date_ob.getDate()).slice(-2)
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2)
    let year = date_ob.getFullYear()
    let hours = date_ob.getHours()
    let minutes = date_ob.getMinutes()
    let seconds = date_ob.getSeconds()
    let string = ""
    string = string.concat(year, "-", month, "-", date, " ", hours, ":", minutes, ":", seconds)
    // notes = `${localStorage.getItem("TMSAppUsername")},${g}, "" , ${string}, " ", "Task Have Been Moved to ", ${g}, "\n"` + notes
    let string2 = ""
    string2 = string2.concat(localStorage.getItem("TMSAppUsername"), " ", g, " ", string, " ", "Task Have Been Moved to ", g, "\n\n", notes)

    console.log(string2)
    Axios.post("http://localhost:8000/handlestatechange", { e, f, g, string2 }).then((response) => {
      console.log(response.data.result)
      window.location.reload()
    })
  }
  function handleviewtask(doc) {
    localStorage.setItem("viewtask", JSON.stringify(doc))
    console.log(doc)
    navigate("/viewtask/" + doc.Task_id)
  }
  function handleedittask(doc) {
    localStorage.setItem("viewtask", JSON.stringify(doc))
    console.log(doc)
    navigate("/edittask/" + doc.Task_id)
  }
  let appData = JSON.parse(localStorage.getItem("App"))
  console.log(appData)
  let group = localStorage.getItem("TMSAppGrp")
  function handleexit() {
    console.log("bye")
    //props.setLoggedIn(false)
    navigate("/home")
  }
  return (
    <>
      <Container style={{ marginTop: "10px" }}>
        <h2>Application Name : {appData.App_acronym}</h2>
        <button onClick={handleexit} className="btn btn-sm btn-secondary">
          Back to Previous
        </button>
        {projectmanager && (
          <Button variant="dark" onClick={handleCreatePlan}>
            Create Plan
          </Button>
        )}
        {group.includes(appData.App_permit_Create) && appData.App_permit_Create !== "" && (
          <Button variant="dark" style={{ marginLeft: "10px", marginRight: "40px" }} onClick={handleCreateTask}>
            Create Task
          </Button>
        )}
        <strong>Permit for Create Task: </strong>
        {appData.App_permit_Create}
      </Container>
      <Container>
        <Row>
          <Col md={2}>
            {allplan.map((doc) => (
              <Card style={{ marginTop: "10px", marginTop: "25px" }}>
                <Card.Body>
                  <Card.Header key={doc.Plan_MVP_name}>Plan</Card.Header>
                  <Card.Title>{doc.Plan_MVP_name}</Card.Title>
                  <Card.Text>{doc.Plan_des}</Card.Text>
                  <Card.Text>{doc.Plan_startDate}</Card.Text>
                  {projectmanager && (
                    <Button variant="dark" onClick={(e) => handleEditPlan(doc.Plan_MVP_name)}>
                      Edit Plan
                    </Button>
                  )}
                </Card.Body>
              </Card>
            ))}
          </Col>
          <Col>
            <strong> Permit for Open : </strong>
            {appData.App_permit_Open}
            <Card.Header style={{ textAlign: "center" }}>{task[0]}</Card.Header>
            {open.map((doc) => (
              <Card style={{ marginTop: "10px" }}>
                <Card.Body>
                  <Card.Header key={doc.Task_id}>{doc.Task_id}</Card.Header>
                  <Card.Title>{doc.Task_name}</Card.Title>
                  <Card.Text>
                    <details>
                      {doc.Task_Description}
                      <summary>Description Details</summary>
                    </details>
                  </Card.Text>
                  <strong>Task Creation Date</strong>
                  <Card.Text>{doc.Task_createDate}</Card.Text>
                  <strong>Last Edited By</strong>
                  <Card.Text>{doc.Task_owner}</Card.Text>
                  <Button variant="dark" onClick={() => handleviewtask(doc)}>
                    View Task
                  </Button>
                  {group.includes(appData.App_permit_Open) && appData.App_permit_Open !== "" && (
                    <Button variant="dark" style={{ marginTop: "10px", marginBottom: "10px" }} onClick={() => handleedittask(doc)}>
                      Edit Task
                    </Button>
                  )}
                  {group.includes(appData.App_permit_Open) && appData.App_permit_Open !== "" && (
                    <Button variant="dark" style={{ marginBottom: "10px" }} onClick={() => handlestatechange(doc.Task_id, localStorage.getItem("TMSAppUsername"), task[1], doc.Task_notes)}>
                      Next State
                    </Button>
                  )}
                </Card.Body>
              </Card>
            ))}
          </Col>
          <Col>
            <strong> Permit for toDo : </strong>
            {appData.App_permit_toDoList}
            <Card.Header style={{ textAlign: "center" }}>{task[1]}</Card.Header>
            {todo.map((doc) => (
              <Card style={{ marginTop: "10px" }}>
                <Card.Body>
                  <Card.Header key={doc.Task_id}>{doc.Task_id}</Card.Header>
                  <Card.Title>{doc.Task_name}</Card.Title>
                  <Card.Text>
                    <details>
                      {doc.Task_Description}
                      <summary>Description Details</summary>
                    </details>
                  </Card.Text>
                  <strong>Task Creation Date</strong>
                  <Card.Text>{doc.Task_createDate}</Card.Text>
                  <strong>Last Edited By</strong>
                  <Card.Text>{doc.Task_owner}</Card.Text>
                  <Button variant="dark" onClick={() => handleviewtask(doc)}>
                    View Task
                  </Button>
                  {group.includes(appData.App_permit_toDoList) && appData.App_permit_toDoList !== "" && (
                    <Button variant="dark" style={{ marginTop: "10px", marginBottom: "10px" }} onClick={() => handleedittask(doc)}>
                      Edit Task
                    </Button>
                  )}
                  {group.includes(appData.App_permit_toDoList) && appData.App_permit_toDoList !== "" && (
                    <Button variant="dark" style={{ marginBottom: "10px" }} onClick={() => handlestatechange(doc.Task_id, localStorage.getItem("TMSAppUsername"), task[2], doc.Task_notes)}>
                      Next State
                    </Button>
                  )}
                </Card.Body>
              </Card>
            ))}
          </Col>
          <Col>
            <strong> Permit for Doing : </strong>
            {appData.App_permit_Doing}
            <Card.Header style={{ textAlign: "center" }}>{task[2]}</Card.Header>
            {doing.map((doc) => (
              <Card style={{ marginTop: "10px" }}>
                <Card.Body>
                  <Card.Header key={doc.Task_id}>{doc.Task_id}</Card.Header>
                  <Card.Title>{doc.Task_name}</Card.Title>
                  <Card.Text>
                    <details>
                      {doc.Task_Description}
                      <summary>Description Details</summary>
                    </details>
                  </Card.Text>
                  <strong>Task Creation Date</strong>
                  <Card.Text>{doc.Task_createDate}</Card.Text>
                  <strong>Last Edited By</strong>
                  <Card.Text>{doc.Task_owner}</Card.Text>
                  <Button variant="dark" onClick={() => handleviewtask(doc)}>
                    View Task
                  </Button>
                  {group.includes(appData.App_permit_Doing) && appData.App_permit_Doing !== "" && (
                    <Button variant="dark" style={{ marginTop: "10px", marginBottom: "10px" }} onClick={() => handleedittask(doc)}>
                      Edit Task
                    </Button>
                  )}
                  {group.includes(appData.App_permit_Doing) && appData.App_permit_Doing !== "" && (
                    <Button variant="dark" style={{ marginBottom: "10px" }} onClick={() => handlestatechange(doc.Task_id, localStorage.getItem("TMSAppUsername"), task[3], doc.Task_notes)}>
                      Next State
                    </Button>
                  )}
                  {group.includes(appData.App_permit_Doing) && appData.App_permit_Doing !== "" && (
                    <Button variant="dark" style={{ marginBottom: "10px" }} onClick={() => handlestatechange(doc.Task_id, localStorage.getItem("TMSAppUsername"), task[1], doc.Task_notes)}>
                      Previous State
                    </Button>
                  )}
                </Card.Body>
              </Card>
            ))}
          </Col>
          <Col>
            <strong> Permit for Done : </strong>
            {appData.App_permit_Done}
            <Card.Header style={{ textAlign: "center" }}>{task[3]}</Card.Header>
            {done.map((doc) => (
              <Card style={{ marginTop: "10px" }}>
                <Card.Body>
                  <Card.Header key={doc.Task_id}>{doc.Task_id}</Card.Header>
                  <Card.Title>{doc.Task_name}</Card.Title>
                  <Card.Text>
                    <details>
                      {doc.Task_Description}
                      <summary>Description Details</summary>
                    </details>
                  </Card.Text>
                  <strong>Task Creation Date</strong>
                  <Card.Text>{doc.Task_createDate}</Card.Text>
                  <strong>Last Edited By</strong>
                  <Card.Text>{doc.Task_owner}</Card.Text>
                  <Button variant="dark" onClick={() => handleviewtask(doc)}>
                    View Task
                  </Button>
                  {group.includes(appData.App_permit_Done) && appData.App_permit_Done !== "" && (
                    <Button variant="dark" style={{ marginTop: "10px", marginBottom: "10px" }} onClick={() => handleedittask(doc)}>
                      Edit Task
                    </Button>
                  )}
                  {group.includes(appData.App_permit_Done) && appData.App_permit_Done !== "" && (
                    <Button variant="dark" style={{ marginBottom: "10px" }} onClick={() => handlestatechange(doc.Task_id, localStorage.getItem("TMSAppUsername"), task[4], doc.Task_notes)}>
                      Next State
                    </Button>
                  )}
                  {group.includes(appData.App_permit_Done) && appData.App_permit_Done !== "" && (
                    <Button variant="dark" style={{ marginBottom: "10px" }} onClick={() => handlestatechange(doc.Task_id, localStorage.getItem("TMSAppUsername"), task[2], doc.Task_notes)}>
                      Previous State
                    </Button>
                  )}
                </Card.Body>
              </Card>
            ))}
          </Col>
          <Col>
            <Card.Header style={{ textAlign: "center", marginTop: "25px" }}>{task[4]}</Card.Header>
            {close.map((doc) => (
              <Card style={{ marginTop: "10px" }}>
                <Card.Body>
                  <Card.Header key={doc.Task_id}>{doc.Task_id}</Card.Header>
                  <Card.Title>{doc.Task_name}</Card.Title>
                  <Card.Text>
                    <details>
                      {doc.Task_Description}
                      <summary>Description Details</summary>
                    </details>
                  </Card.Text>
                  <strong>Task Creation Date</strong>
                  <Card.Text>{doc.Task_createDate}</Card.Text>
                  <strong>Last Edited By</strong>
                  <Card.Text>{doc.Task_owner}</Card.Text>
                  <Button variant="dark" onClick={() => handleviewtask(doc)}>
                    View Task
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ViewApplication
