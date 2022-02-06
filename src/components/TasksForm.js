import React, { useEffect, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { Button } from 'reactstrap'
import getTask from '../services/getTask'
import updateTask from '../services/updateTask'
import db from '../firebaseConfig'
import './styles.css'

// eslint-disable-next-line react/prop-types
const TasksForm = ({ currentId, setCurrentId }) => {
  const [task, setTask] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target

    setTask({
      ...task,
      [name]: value
    })
  }

  const getEditTask = async (currentId) => {
    try {
      const task = await getTask(currentId)
      setTask({
        ...task,
        id: currentId
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (currentId !== null) {
      getEditTask(currentId)
    } else {
      setTask({
        title: '',
        description: ''
      })
    }
  }, [currentId])

  const handleSubmit = async (e) => {
    const { target } = e

    e.preventDefault()

    try {
      if (currentId === null) {
        await addDoc(collection(db, 'tasks'), task)
      } else {
        await updateTask(task)
        setCurrentId(null)
      }
    } catch (error) {
      console.log(error)
    }
    target.reset()
    setTask(null)
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
          id='taskName'
          autoFocus={true}
          placeholder='Nombre de la tarea'
          name='title'
          value={task?.title || ''}
          onChange={(e) => handleChange(e)}
        />
        <label
          htmlFor='taskName'
          className='form-label text-muted'
        >
          Tarea
        </label>
      </div>
      <div className='form-floating'>
        <textarea
          id='taskDescription'
          className='form-control bg-light'
          style={ { height: '100px', resize: 'none' } }
          placeholder='Descripción'
          name='description'
          value={task?.description || ''}
          onChange={(e) => handleChange(e)}
        >
        </textarea>
        <label
          htmlFor='taskDescription'
          className='form-label text-muted'
        >
          Descripción
        </label>
      </div>
      <div className='d-flex justify-content-center mt-3'>
        <Button
          className="btn-custom-primary d-flex gap-2 align-items-center"
        >
          { currentId === null
            ? <span className='d-flex gap-2 align-items-center'>
              Guardar
              <i className='far fa-save fa-lg'/>
            </span>
            : <span className='d-flex gap-2 align-items-center'>
              Editar
              <i className='far fa-edit fa-lg'/>
            </span>
          }
        </Button>
      </div>
    </form>
  )
}

export default TasksForm
