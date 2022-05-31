import React, { useState } from "react"
import "./App.css"
import TasksForm from "./components/TasksForm"
import Tasks from "./components/Tasks"
import img from "./assets/img/bg-pc.jpg"

function App() {
  const [currentId, setCurrentId] = useState(null)
  return (
    <div className="p-4 bg-color app-container">
      <div className="bg-img">
        <img src={img} alt="img-background" />
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-center my-4">
          <h1 className="app-title display-3">TAREAS</h1>
        </div>
        <div className="col-sm-8 col-md-6 container-fluid">
          <TasksForm currentId={currentId} setCurrentId={setCurrentId} />
        </div>
      </div>
      <div className="row d-flex flex-column align-items-center mt-5">
        <div className="col-sm-12 col-md-4">
          <Tasks setCurrentId={setCurrentId} />
        </div>
      </div>
    </div>
  )
}

export default App
