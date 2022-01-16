import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import db from '../firebaseConfig'

const TasksForm = () => {
  const [tasks, setTasks] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'title') {
      setTasks({
        ...tasks,
        [name]: value
      })
    } else if (name === 'description') {
      setTasks({
        ...tasks,
        [name]: value
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await addDoc(collection(db, 'tasks'), tasks)
    } catch (error) {
      console.log(error)
    }

    e.target.reset()
  }

  return (
    <form
      className='card card-body'
      onSubmit={e => handleSubmit(e)}
    >
      <div className='form-floating mb-3'>
        <input
          type='text'
          className='form-control bg-light'
          id='tasksName'
          autoFocus={true}
          placeholder='Nombre de la tarea'
          name='title'
          onChange={(e) => handleChange(e, 'title')}
        />
        <label
          htmlFor='tasksName'
          className='form-label text-muted'
        >
          Tarea
        </label>
      </div>
      <div className='form-floating'>
        <textarea
          id='tasksDescription'
          className='form-control bg-light'
          style={ { height: '100px', resize: 'none' } }
          placeholder='Descripción'
          name='description'
          onChange={(e) => handleChange(e, 'description')}
        >
        </textarea>
        <label
          htmlFor='tasksDescription'
          className='form-label text-muted'
        >
          Descripción
        </label>
      </div>
      <div className='d-flex justify-content-center mt-3'>
        <button className="btn btn-primary">Enviar</button>
      </div>
    </form>
  )
}

export default TasksForm
