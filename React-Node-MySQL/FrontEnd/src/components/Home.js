import Axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "react-bootstrap/Button"
function Home() {
  const navigate = useNavigate()
  const [appDetail, setappDetails] = useState([])
  function handleHandler(acronym) {
    console.log(acronym, "GEEZ")
    navigate("/editapplication/" + acronym)
    localStorage.setItem("EditApplication", acronym)
  }
  useEffect(() => {
    Axios.get("http://localhost:8000/graballapplication").then((response) => {
      console.log("Hello", response.data.result)
      //setGroup(response.data.result.map((group) => group.grp))
      setappDetails(response.data.result)
    })
    window.onload()
  }, [])
  window.onload = function () {
    if (!window.location.hash) {
      window.location = window.location + "#loaded"
      window.location.reload()
    }
  }
  function handleCreateApp(e) {
    e.preventDefault()
    navigate("/createapp")
  }
  function handleViewApp(e, f, doc) {
    console.log("plan for ", e)
    localStorage.setItem("App", JSON.stringify(doc))
    localStorage.setItem("R_number", f)
    navigate("/viewindividualApplication/" + e)
    localStorage.setItem("ViewApplication", e)
  }
  let group = localStorage.getItem("TMSAppGrp")
  return (
    <div className="container">
      <div style={{ position: "relative" }}>
        <h1 style={{ float: "left" }}> Task Management System Application Table</h1>
        {group.includes("ProjectLead") ? (
          <button onClick={handleCreateApp} className="btn btn-dark" style={{ marginTop: "10px", marginLeft: "auto", float: "right" }}>
            Create New Application
          </button>
        ) : null}
      </div>
      <div className="table" style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>App Acronym</th>
            <th>App Description</th>
            <th>App Start Date</th>
            <th>App End Date</th>
            <th>App Create Permit</th>
            <th>App Open Permit</th>
            <th>App to Do List Permit</th>
            <th>App Doing Permit</th>
            <th>App Done Permit</th>
          </tr>
        </thead>
        {appDetail !== null ? (
          <tbody>
            {appDetail.map((doc, index) => {
              return (
                <tr key={doc.App_acronym}>
                  <td>{index + 1}</td>
                  <td>
                    {doc.App_acronym}{" "}
                    <Button onClick={(e) => handleViewApp(doc.App_acronym, doc.App_Rnumber, doc)} variant="dark">
                      {" "}
                      View Task and Plan
                    </Button>
                  </td>
                  <td>
                    <details>
                      {doc.App_Description == "undefined" ? "" : doc.App_Description}
                      <summary>Description Details</summary>
                    </details>
                  </td>
                  <td>{doc.App_startDate}</td>
                  <td>{doc.App_endDate}</td>
                  <td>{doc.App_permit_Create}</td>
                  <td>{doc.App_permit_Open}</td>
                  <td>{doc.App_permit_toDoList}</td>
                  <td>{doc.App_permit_Doing}</td>
                  <td>{doc.App_permit_Done}</td>

                  <td>
                    {group.includes("ProjectLead") ? (
                      <Button onClick={(e) => handleHandler(doc.App_acronym)} variant="dark">
                        Edit Application
                      </Button>
                    ) : null}
                  </td>
                </tr>
              )
            })}
          </tbody>
        ) : null}
      </div>
    </div>
  )
}

export default Home
