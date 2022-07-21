import React, { useState, useEffect } from "react"
import Axios from "axios"
import { useNavigate } from "react-router-dom"

function EditGroup() {
  const [group, setGroup] = useState([])
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    Axios.get("http://localhost:8000/graballgroup").then((response) => {
      console.log(response.data.result)
      //setGroup(response.data.result.map((group) => group.grp))
      setGroup(response.data.result)
    })
  }, [])
  /*  <button onClick={handleexit} className="btn btn-sm btn-secondary">
  Back
  </button> */
  function handleexit() {
    console.log("bye")
    //props.setLoggedIn(false)
    navigate("/home")
  }
  function handleCreateGrp(e) {
    e.preventDefault()
    navigate("/creategroup")
  }
  function handleHandler(grp, status) {
    console.log(status)
    if (status === "Enabled") {
      status = "Disabled"
      console.log(grp, "after", status)
    } else if (status === "Disabled") {
      status = "Enabled"
    }
    console.log(grp, "after", status)
    Axios.put("http://localhost:8000/updategrpstatus", { grp, status }).then((response) => {
      if (response.data.result != null) {
        console.log(response.data)

        window.location.reload(true)
      }
      setMessage(response.data.message)
    })
    window.location.reload()
  }
  return (
    <div className="container" style={{ marginTop: "2px" }}>
      <button onClick={handleexit} className="btn btn-sm btn-secondary" style={{ marginRight: "10px" }}>
        Back
      </button>
      <button onClick={handleCreateGrp} className="btn btn-dark">
        Create Group
      </button>
      <div className="row align-items-center">
        <div style={{ marginRight: "auto", marginLeft: "auto" }}>
          <div className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Group</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {group.map((doc, index) => {
                return (
                  <tr key={doc.grp}>
                    <td>{index + 1}</td>
                    <td>{doc.grp}</td>
                    <td>{doc.status}</td>

                    <td>
                      <button onClick={(e) => handleHandler(doc.grp, doc.status)} className="btn btn-dark">
                        Toggle Status
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            {message && (
              <div>
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-4 rounded relative" role="alert">
                  {message}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditGroup
