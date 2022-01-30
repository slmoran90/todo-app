import React from 'react'
import './App.css'
import TasksForm from './components/TasksForm'
import Tasks from './components/Tasks'

function App () {
  return (
    <div className='p-4 bg-color'>
      <div className="row">
        <div className="col-sm-12 col-md-6 container-fluid">
          <TasksForm/>
        </div>
      </div>
      <div className="row d-flex flex-column align-items-center mt-5">
        <div className="col-sm-12 col-md-4">
          <Tasks/>
        </div>
      </div>
    </div>
  )
}

export default App
