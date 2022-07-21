import React from "react"
import { Link } from "react-router-dom"
import AdminLoggedHeader from "./AdminLoggedheader"
import UserGroupHeader from "./UserLoggedheader"

function Header(props) {
  return (
    <div>
      <div>{localStorage.getItem("LoggedinState") ? localStorage.getItem("TMSAppGrp").includes("admin") ? <AdminLoggedHeader /> : <UserGroupHeader /> : null} </div>
    </div>
  )
}

export default Header
