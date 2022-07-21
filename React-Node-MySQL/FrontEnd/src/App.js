//import logo from './logo.svg';
import "./index.css"
//import "./main.css"
import Login from "./components/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import React, { useState } from "react"
import UserLoggedIn from "./components/UserLogged"
import EditEmail from "./components/EditEmail"
import EditPassword from "./components/EditPassword"
import CreateUser from "./components/CreateUser"
import CreateGroup from "./components/CreateGroup"
import TableUser from "./components/Tableprojections"
import EditUser from "./components/EditUser"
import EditGroup from "./components/EditGroup"
import Home from "./components/Home"
import CreateApp from "./components/CreateApp"
import EditApplication from "./components/EditApplication"
import Header from "./components/Header"
import Profile from "./components/AdminLogged"
import Button from "react-bootstrap/Button"
import ViewApplication from "./components/ViewApplication"
import CreatePlan from "./components/CreatePlan"
import EditPlan from "./components/EditPlan"
import CreateTask from "./components/CreateTask"
import { components } from "react-trello"
import ViewTask from "./components/ViewTask"
import EditTask from "./components/EditTask"
//import ReactDOM from "react-dom/client"

function App() {
  /* const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("LoggedinState") || "") */
  return (
    <BrowserRouter>
      <Header /* isLoggedIn={isLoggedIn} */ />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user" element={<UserLoggedIn />} />
        <Route path="/editemail" element={<EditEmail />} />
        <Route path="/editpassword" element={<EditPassword />} />
        <Route path="/createuser" element={<CreateUser />} />
        <Route path="/creategroup" element={<CreateGroup />} />
        <Route path="/Tableprojections" element={<TableUser />} />
        <Route path="/edituser/:username" element={<EditUser />} />
        <Route path="/editgroup" element={<EditGroup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createapp" element={<CreateApp />} />
        <Route path="/editapplication/:acronym" element={<EditApplication />} />
        <Route path="/viewindividualApplication/:acronym" element={<ViewApplication />} />
        <Route path="/createplan" element={<CreatePlan />} />
        <Route path="/editplan/:MVPname" element={<EditPlan />} />
        <Route path="/createtask" element={<CreateTask />} />
        <Route path="/viewtask/:taskname" element={<ViewTask />} />
        <Route path="/edittask/:taskname" element={<EditTask />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
