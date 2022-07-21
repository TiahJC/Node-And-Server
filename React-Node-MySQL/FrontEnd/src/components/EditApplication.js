import React, { useEffect, useState } from "react"
import Axios from "axios"
import { Multiselect } from "multiselect-react-dropdown"
import { useNavigate } from "react-router-dom"
function EditApplication() {
  const navigate = useNavigate()
  const [group, setGroup] = useState([])
  const [appAcronym, setappAcronym] = useState("")
  const [appdes, setAppdes] = useState("")
  const [appstart, setappstart] = useState("")
  const [append, setappend] = useState("")
  const [appcreate, setappcreate] = useState("")
  const [appopen, setappopen] = useState("")
  const [apptodo, setapptodo] = useState("")
  const [appdoing, setappdoing] = useState("")
  const [appdone, setappdone] = useState("")
  const [sappcreate, ssetappcreate] = useState("")
  const [sappopen, ssetappopen] = useState("")
  const [sapptodo, ssetapptodo] = useState("")
  const [sappdoing, ssetappdoing] = useState("")
  const [sappdone, ssetappdone] = useState("")
  const [message, setMessage] = useState("")
  let string = ""
  let array = []
  useEffect(() => {
    Axios.get("http://localhost:8000/graballgroup/").then((response) => {
      //setGroup(response.data.result.map((group) => group.grp))
      setGroup(
        response.data.result.map((res) => {
          return { grp: res.grp, index: res.grp }
        })
      )
      console.log(group)
    })
    Axios.get("http://localhost:8000/grabappinfos/" + localStorage.getItem("EditApplication")).then((response) => {
      console.log("result found", response)
      setappAcronym(localStorage.getItem("EditApplication"))
      console.log("string", string)

      setAppdes(response.data?.result[0]?.App_Description)
      setappstart(response.data.result[0].App_startDate)
      setappend(response.data.result[0].App_endDate)

      setappcreate(response.data.result[0].App_permit_Create)
      ssetappcreate(stringtoarray(response.data.result[0].App_permit_Create))
      console.log("Create", stringtoarray(response.data.result[0].App_permit_Create))
      setappopen(response.data.result[0].App_permit_Open)
      ssetappopen(stringtoarray(response.data.result[0].App_permit_Open))

      setapptodo(response.data.result[0].App_permit_toDoList)
      ssetapptodo(stringtoarray(response.data.result[0].App_permit_toDoList))

      setappdoing(response.data.result[0].App_permit_Doing)
      ssetappdoing(stringtoarray(response.data.result[0].App_permit_Doing))
      setappdone(response.data.result[0].App_permit_Done)
      ssetappdone(stringtoarray(response.data.result[0].App_permit_Done))
    })
  }, [])
  const stringtoarray = (string) => {
    array = string.split(",")
    return array.map((name) => {
      return { grp: name, index: name }
    })
  }
  function handleSubmit(e) {
    e.preventDefault()
    setMessage("")
    console.log("Upon Submiting", appAcronym, appdes, appstart, append, appcreate, appopen, apptodo, appdoing, appdone)
    try {
      Axios.put("http://localhost:8000/editapp", { appAcronym, appdes, appstart, append, appcreate, appopen, apptodo, appdoing, appdone }).then((response) => {
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
  const handleChange = (e) => {
    array = e.map((e) => e.grp)
    string = array.join(",")
    console.log(string)
    return string
  }
  function handleexit() {
    console.log("bye")
    //props.setLoggedIn(false)
    navigate("/home")
  }
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
          <button onClick={handleexit} className="btn btn-dark" style={{ marginTop: "10px" }}>
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
                <small>Application Acronym</small>
              </label>
              <h2>&nbsp;&nbsp;&nbsp;{localStorage.getItem("EditApplication")}</h2>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text-muted mb-1">
                <small>Description</small>
              </label>
              <textarea onChange={(e) => setAppdes(e.target.value)} name="password" className="form-control" type="text" value={appdes} />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="text-muted mb-1">
                <small>Start Date</small>
              </label>
              <input onChange={(e) => setappstart(e.target.value)} value={appstart} name="email" className="form-control" type="date" />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="text-muted mb-1">
                <small>End Date</small>
              </label>
              <input onChange={(e) => setappend(e.target.value)} value={append} name="email" className="form-control" type="date" />
            </div>
            <small>Permitting to Create</small>
            <Multiselect
              singleSelect={true}
              options={group}
              selectedValues={sappcreate}
              onSelect={(e) => {
                const string = handleChange(e)
                setappcreate(string)
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
              selectedValues={sappopen}
              onSelect={(e) => {
                const string = handleChange(e)
                setappopen(string)
                console.log("SeeSomethinghere", appopen)
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
              selectedValues={sapptodo}
              onSelect={(e) => {
                const string = handleChange(e)
                setapptodo(string)
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
              selectedValues={sappdoing}
              onSelect={(e) => {
                const string = handleChange(e)
                setappdoing(string)
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
              selectedValues={sappdone}
              onSelect={(e) => {
                const string = handleChange(e)
                setappdone(string)
              }}
              onRemove={(e) => {
                const string = handleChange(e)
              }}
              displayValue={"grp"}
            />
            <button className="btn btn-dark"> Submit Changes </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditApplication
