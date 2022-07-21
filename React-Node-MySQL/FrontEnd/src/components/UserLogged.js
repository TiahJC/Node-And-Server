import React from "react"
import { useNavigate } from "react-router-dom"

function UserLoggedIn() {
  const navigate = useNavigate()

  function handleeditPassword(e) {
    e.preventDefault()
    navigate("/editpassword")
  }

  function handleeditEmail(e) {
    e.preventDefault()
    navigate("/editemail")
  }

  function handleLoggedOut() {
    //props.setLoggedIn(false)
    navigate("/")
    localStorage.removeItem("TMSAppUsername")
    localStorage.removeItem("TMSAppStatus")
    localStorage.removeItem("TMSAppGrp")
    localStorage.removeItem("TMSAppPassword")
    localStorage.removeItem("TMSAppEmail")
  }
  return (
    <div className="container">
      <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
        <a href="#" className="mr-2"></a>
        <div>
          <p>
            Username : <strong>{localStorage.getItem("TMSAppUsername")}</strong>
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
        </div>
        <button onClick={handleeditEmail} className="btn btn-success btn-block">
          Edit Email
        </button>
        <button onClick={handleeditPassword} className="btn btn-success btn-block">
          Edit Password
        </button>
        <button onClick={handleLoggedOut} className="btn btn-sm btn-secondary">
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default UserLoggedIn
