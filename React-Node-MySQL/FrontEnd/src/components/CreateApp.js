import React, { useEffect, useState } from "react"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import { Multiselect } from "multiselect-react-dropdown"
function CreateApp() {
  const [appAcronym, setappAcronym] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setstartDate] = useState("")
  const [message, setMessage] = useState("")
  const [group, setGroup] = useState([])
  const [endDate, setendDate] = useState([])
  const [permitCreate, setpermitCreate] = useState("")
  const [permitOpen, setpermitOpen] = useState("")
  const [permitTodoList, setpermitTodoList] = useState("")
  const [permitDoing, setpermitDoing] = useState("")
  const [permitDone, setpermitDone] = useState("")
  const [rnum, setrnum] = useState(0)
  let array = []
  let string = ""

  //---------------------------------//
  const navigate = useNavigate()
  useEffect(() => {
    Axios.get("http://localhost:8000/graballgroup").then((response) => {
      console.log(response.data.result)
      //setGroup(response.data.result.map((group) => group.grp))
      setGroup(response.data.result)
    })
  }, [])

  //--------------------------------//
  function handleexit() {
    console.log("bye")
    //props.setLoggedIn(false)
    navigate("/home")
  }
  function handleSubmit(e) {
    e.preventDefault()
    setMessage("")
    console.log("Upon Submiting", appAcronym, description, startDate, endDate, permitCreate, permitOpen, permitTodoList, permitDoing, permitDone, rnum)
    console.log("hello", description)
    try {
      Axios.post("http://localhost:8000/createapp", { appAcronym, description, startDate, endDate, permitCreate, permitOpen, permitTodoList, permitDoing, permitDone, rnum }).then((response) => {
        setMessage(response.data.message)
        if (response.data.result != null) {
          console.log("Hello", response.data)
          setMessage(response.data.message)
        }
        console.log("Hello", response.data)
        setMessage(response.data.message)
        console.log(message)
      })
      window.scrollTo(0, 0)
      window.setTimeout(function () {
        window.location.reload()
      }, 500)
    } catch (e) {
      console.log("Logging In session Line 22 Login.js Occured error")
    }
  }
  // if (password != "") {

  //   } else {
  //     alert("passwrod invalid format")
  //   }
  // } else {
  //   alert("password field is required")
  // }
  /* const handleChange = (e) => {
    setSelectedGroup(e.target.value)
    alert("selectedGroup")
  } */
  const handleChange = (e) => {
    array = e.map((e) => e.grp)
    string = array.join(",")
    console.log(string)
    return string
  }
  const handleStatus = (e) => {
    console.log(e)
  }

  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
          <button onClick={handleexit} className="btn btn-sm btn-secondary">
            Back to Previous
          </button>
          {message && (
            <div>
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-4 rounded relative" role="alert">
                {message}
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="text-muted mb-1">
                <small>App's Acronyms</small>
              </label>
              <input onChange={(e) => setappAcronym(e.target.value)} name="username" className="form-control" type="text" placeholder="App's Acronyms" autoComplete="off" required />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text-muted mb-1">
                <small>Description</small>
              </label>
              <textarea onChange={(e) => setDescription(e.target.value)} name="password" className="form-control" type="password" placeholder="Description" />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="text-muted mb-1">
                <small>Start Date</small>
              </label>
              <input onChange={(e) => setstartDate(e.target.value)} name="email" className="form-control" type="date" />
              <small>End Date</small>
              <input onChange={(e) => setendDate(e.target.value)} name="email" className="form-control" type="date" />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="text-muted mb-1">
                <small>Running Number</small>
              </label>
              <input onChange={(e) => setrnum(e.target.value)} name="email" className="form-control" type="number" min="0" value={rnum} />
            </div>
            <small>Permitting to Create</small>
            <Multiselect
              singleSelect={true}
              options={group}
              onSelect={(e) => {
                const string = handleChange(e)
                setpermitCreate(string)
              }}
              onRemove={(e) => {
                const string = handleChange(e)
              }}
              displayValue={"grp"}
            />
            <small>Permitting to Open</small>
            <Multiselect
              singleSelect={true}
              options={group}
              onSelect={(e) => {
                const string = handleChange(e)
                setpermitOpen(string)
                console.log("SeeSomethinghere", permitOpen)
              }}
              onRemove={(e) => {
                const string = handleChange(e)
              }}
              displayValue={"grp"}
            />
            <small>Permitting to Do List</small>
            <Multiselect
              singleSelect={true}
              options={group}
              onSelect={(e) => {
                const string = handleChange(e)
                setpermitTodoList(string)
              }}
              onRemove={(e) => {
                const string = handleChange(e)
              }}
              displayValue={"grp"}
            />
            <small>Permitting to Doing</small>
            <Multiselect
              singleSelect={true}
              options={group}
              onSelect={(e) => {
                const string = handleChange(e)
                setpermitDoing(string)
              }}
              onRemove={(e) => {
                const string = handleChange(e)
              }}
              displayValue={"grp"}
            />
            <small>Permitting to Done</small>
            <Multiselect
              singleSelect={true}
              options={group}
              onSelect={(e) => {
                const string = handleChange(e)
                setpermitDone(string)
              }}
              onRemove={(e) => {
                const string = handleChange(e)
              }}
              displayValue={"grp"}
            />
            <button className="btn btn-dark" style={{ marginTop: "10px" }}>
              {" "}
              Create Application{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default CreateApp
