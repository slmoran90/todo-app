import React, { useState } from 'react'
import './App.css'
import TasksForm from './components/TasksForm'
import Tasks from './components/Tasks'

function App () {
  const [currentId, setCurrentId] = useState(null)
  return (
    <div className='p-4 bg-color'>
      <div className="row">
        <div className="col-sm-12 col-md-6 container-fluid">
          <TasksForm
            currentId={ currentId }
            setCurrentId={ setCurrentId }
          />
        </div>
      </div>
      <div className="row d-flex flex-column align-items-center mt-5">
        <div className="col-sm-12 col-md-4">
          <Tasks
            setCurrentId={ setCurrentId }
          />
        </div>
      </div>
    </div>
  )
}

export default App
