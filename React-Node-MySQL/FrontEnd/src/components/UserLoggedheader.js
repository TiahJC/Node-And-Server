import React from "react"
import { useNavigate } from "react-router-dom"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"

function UserGroupHeader() {
  const navigate = useNavigate()
  function handleLoggedOut() {
    //props.setLoggedIn(false)
    setTimeout(function () {
      localStorage.clear()
      window.location.reload()
      navigate("/")
    }, 1000)
  }
  function handleProfileButton() {
    console.log("working")
    navigate("/profile")
  }
  function handleHomeButton(e) {
    e.preventDefault()
    navigate("/home")
  }
  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="me-auto">
        <Navbar.Brand href="/home">Task Management System</Navbar.Brand>
        <Nav.Link onClick={handleHomeButton}>Application Table</Nav.Link>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown id="nav-dropdown-dark-example" title={localStorage.getItem("TMSAppUsername")} menuVariant="dark">
              <NavDropdown.Item onClick={handleProfileButton}>Manage Your Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLoggedOut}>Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Nav>
    </Navbar>
  )
}

export default UserGroupHeader
