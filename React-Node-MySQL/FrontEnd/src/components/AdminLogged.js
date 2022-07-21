import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Card from "react-bootstrap/Card"

function Profile() {
  const navigate = useNavigate()
  useEffect(() => {
    window.onload()
  }, [])
  window.onload = function () {
    if (!window.location.hash) {
      window.location = window.location + "#loaded"
      window.location.reload()
    }
  }
  function handleeditPassword(e) {
    e.preventDefault()
    navigate("/editpassword")
  }

  function handleeditEmail(e) {
    e.preventDefault()
    navigate("/editemail")
  }

  return (
    <div>
      <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5" style={{ marginRight: "auto", marginLeft: "auto" }}>
        <Card>
          <p>
            Username :<strong>{localStorage.getItem("TMSAppUsername")}</strong>
          </p>
          <p>
            Email:
            <strong>{localStorage.getItem("TMSAppEmail")}</strong>
          </p>
          <p>
            Status:
            <strong>{localStorage.getItem("TMSAppStatus")}</strong>
          </p>
          <p>
            Group:
            <strong>{localStorage.getItem("TMSAppGrp")}</strong>
          </p>
        </Card>
        <button onClick={handleeditEmail} className="btn btn-dark">
          Edit Email
        </button>
        <button onClick={handleeditPassword} className="btn btn-dark">
          Edit Password
        </button>
        <p></p>
      </div>
    </div>
  )
}

export default Profile
