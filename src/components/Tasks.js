import React, { useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import db from '../firebaseConfig'
import './styles.css'
import { Card, CardHeader, CardBody, CardText, CardFooter, Button } from 'reactstrap'
// import ModalDelete from './ModalDelete'
import deleteTask from '../services/deleteTask'
import Swal from 'sweetalert2'
import 'animate.css'

const Task = () => {
  const [tasksList, setTasksList] = useState([])
  const [taskId, setTaskId] = useState({}) //eslint-disable-line
  // const [showModal, setShowModal] = useState(false)

  const handleClickModal = (task) => { //eslint-disable-line
    // setShowModal(!showModal)

    setTaskId({
      id: task.id,
      title: task.title
    })
  }

  const handleDelete = (taskTitle, id) => {
    const swalButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-custom-primary',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalButtons.fire({
      title: `Borrar ${taskTitle.toUpperCase()}`,
      text: '¿Estás seguro de borrar la tarea?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Atrás',
      reverseButtons: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutDown'
      }
    }).then(result => {
      if (result.isConfirmed) {
        deleteTask(id)
        swalButtons.fire({
          title: '¡Borrado!',
          text: `Se borro ${taskTitle.toUpperCase()}`,
          icon: 'success',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutDown'
          }
        })
      }
    })
  }

  const capitalize = str => (str && str[0].toUpperCase() + str.slice(1)) || ''

  useEffect(() => {
    const getTasks = () => {
      try {
        onSnapshot(collection(db, 'tasks'), data => {
          setTasksList(data.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          })))
        })
      } catch (error) {
        console.log(error)
      }
    }

    getTasks()
  }, [])

  return (
    <>
      { tasksList && tasksList.map(task => {
        return (
          <Card
            key={ task.id }
            className='mb-3 border'
          >
            <CardHeader className='text-muted bg-light border border-light'>
              <h3>{ capitalize(task.title) }</h3>
            </CardHeader>
            <CardBody className='bg-white'>
              <CardText className='font-light'>
                { capitalize(task.description) }
              </CardText>
            </CardBody>
            <CardFooter className='d-flex justify-content-end gap-2 pt-1 border border-0 bg-white'>
              <Button className='btn-custom-primary'>
                Editar
              </Button>
              <Button
                color='danger'
                onClick={ () => handleDelete(task.title, task.id) }
              >
                  Borrar
              </Button>
            </CardFooter>
          </Card>
        )
      })}
      {/* <ModalDelete
        targetId={ taskId }
        showModal={ showModal }
        setShowModal= { setShowModal }
      /> */}
    </>
  )
}

export default Task
